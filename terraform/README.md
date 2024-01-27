# Terraform Infrastructure

The infrastructure is deployed in Google Cloud Platform and managed by Terraform.

## Configuration

Make sure you have a service account setup with its private key is available in `terraform/terraform-service-key.json`.
The service account should have the following roles:

- Cloud Functions Admin
- Cloud Run Admin
- Secret Manager Admin
- Service Account User
- Service Usage Admin
- Storage Admin
- Storage Object Admin

## Bootstrapping

The initial bootstrapping faces the chicken-egg problem as the bucket handling the Terraform state is terraformed.
To handle it comment the `terraform` block containing the backend setup in the `terraform/main.tf` file.
Once commented out you can run the terraform init command (`make devops/terraform/init`).
After the init, run the terraform plan and apply (see make commands below).
Once the bucket is terraformed, we can uncomment the `terraform` block again and terraform init to migrate the state to the bucket.

## Deployment

Terraform plan and apply is handled by a make target that automatically consumes project and service account variables for you.

```sh
make devops/terraform/plan
make devops/terraform/apply
```
