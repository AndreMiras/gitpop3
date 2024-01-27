resource "google_project_service" "cloudrun_api" {
  project            = var.project
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudfunctions_api" {
  project            = var.project
  service            = "cloudfunctions.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild_api" {
  project            = var.project
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

# compile then copy dist/ and package.json to prepare the Cloud Function archive
resource "null_resource" "prepare_archive" {
  triggers = {
    always_run = timestamp()
  }
  provisioner "local-exec" {
    command = <<EOT
      cd ${local.cloud_function_root_dir}
      npx tsc
      mkdir -p ${local.cloud_function_archive_dir}
      cp -r ${local.cloud_function_build_dir} ${local.cloud_function_archive_dir}
      cp ${local.cloud_function_root_dir}/package.json ${local.cloud_function_archive_dir}
      cp ${local.cloud_function_root_dir}/yarn.lock ${local.cloud_function_archive_dir}
    EOT
  }
}

data "archive_file" "graphql_archive" {
  depends_on  = [null_resource.prepare_archive]
  type        = "zip"
  source_dir  = local.cloud_function_archive_dir
  output_path = local.cloud_function_archive_zip
  excludes = concat(
    tolist(fileset(local.cloud_function_archive_dir, "build/*.ts")),
    tolist(fileset(local.cloud_function_archive_dir, "build/*.test.*"))
  )
}

resource "google_storage_bucket_object" "graphql_archive" {
  name       = "${var.service_name}-graphql-cloud-function-${substr(data.archive_file.graphql_archive.output_sha, 0, 8)}"
  depends_on = [data.archive_file.graphql_archive]
  bucket     = google_storage_bucket.graphql_cloud_function.name
  source     = data.archive_file.graphql_archive.output_path
}

resource "google_cloudfunctions2_function" "graphql" {
  name        = "${var.service_name}-graphql"
  description = "The GraphQL function that deals with authenticating to GitHub GraphQL with the the Personal Access Token."
  location    = var.region
  build_config {
    entry_point = "main"
    runtime     = "nodejs18"
    source {
      storage_source {
        bucket = google_storage_bucket.graphql_cloud_function.name
        object = google_storage_bucket_object.graphql_archive.name
      }
    }
  }
  service_config {
    environment_variables = {
      GITHUB_GRAPHQL_API_URL = var.env_github_graphql_api_url
      ALLOWED_ORIGINS        = join(",", var.env_allowed_origins)
    }
    secret_environment_variables {
      key        = "GITHUB_PAT"
      project_id = var.project
      secret     = data.google_secret_manager_secret.github_pat.secret_id
      version    = "latest"
    }
    service_account_email = var.client_email
  }
}

# allow unauthenticated public access to all users, in the future we may want to only allow the Nginx LB
resource "google_cloudfunctions2_function_iam_member" "public" {
  project        = google_cloudfunctions2_function.graphql.project
  location       = google_cloudfunctions2_function.graphql.location
  cloud_function = google_cloudfunctions2_function.graphql.name
  role           = "roles/cloudfunctions.invoker"
  member         = "allUsers"
}

resource "google_cloud_run_service_iam_member" "public_invoker" {
  location = google_cloudfunctions2_function.graphql.location
  service  = google_cloudfunctions2_function.graphql.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "graphql_trigger_url" {
  value = google_cloudfunctions2_function.graphql.url
}
