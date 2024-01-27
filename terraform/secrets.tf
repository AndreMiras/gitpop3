resource "google_project_service" "secretmanager" {
  provider           = google
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

data "google_secret_manager_secret" "github_pat" {
  secret_id  = "${var.service_name}-github-pat"
  depends_on = [google_project_service.secretmanager]
}
