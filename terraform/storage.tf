# the bucket used to deploy the Cloud Function
resource "google_storage_bucket" "graphql_cloud_function" {
  name          = "${var.service_name}-graphql-cloud-function"
  location      = "US"
  storage_class = "STANDARD"
}
