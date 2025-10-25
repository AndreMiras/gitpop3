## Service account variables

variable "credentials" {
  type    = string
  default = "terraform-service-key.json"
}

variable "client_email" {
  type    = string
  default = "terraform-service-account@gitpop3.iam.gserviceaccount.com"
}

## Account variables

variable "project" {
  type    = string
  default = "gitpop3"
}

variable "region" {
  type    = string
  default = "us-east1"
}

variable "zone" {
  type    = string
  default = "us-east1-a"
}

variable "service_name" {
  description = "Prefix to prepend to resource names."
  type        = string
  default     = "gitpop3"
}

## Environment variables

variable "env_github_graphql_api_url" {
  type    = string
  default = "https://api.github.com/graphql"
}

variable "env_allowed_origins" {
  type    = list(string)
  default = ["http://localhost:3000", "https://andremiras.github.io"]
}

locals {
  repo_root                  = "${path.module}/.."
  cloud_function_root_dir    = "${local.repo_root}/serverless"
  cloud_function_build_dir   = "${local.repo_root}/serverless/build"
  cloud_function_archive_dir = "${local.cloud_function_root_dir}/cloud_function_archive"
  cloud_function_archive_zip = "${local.cloud_function_build_dir}/gcf-${var.service_name}.zip"
}
