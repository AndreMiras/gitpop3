# Serverless function

We're using a serverless approach to GitHub GraphQL API authentication thanks to a Cloud Function.
It acts as a proxy to the API handling the Personal Access Token on the server side.

## Configuration

It requires the following environment variables to be setup

- `ALLOWED_ORIGINS`
- `GITHUB_GRAPHQL_API_URL`
- `GITHUB_PAT`

## Run

To run locally, build and run with:

```
npx tsc
source .env
npx functions-framework --target=main
```

## Deployment

The Cloud Function is deployed using Terraform from the project root directory.

```sh
make devops/terraform/apply
```
