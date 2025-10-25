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

## Testing

The serverless function has unit tests covering CORS, environment validation, and proxy functionality.

### Run Tests

```bash
# Run all tests once
yarn test

# Run tests in watch mode (development)
yarn test:watch

# Run tests with coverage report
yarn test:coverage
```

### Test Coverage

After running `yarn test:coverage`, open `coverage/index.html` in a browser to view the coverage report.

### CI/CD

Tests run automatically on every push via GitHub Actions. The workflow:

1. Installs dependencies
2. Runs all tests
3. Reports results

Tests use mocked GitHub API responses - no real API calls are made during testing.

## Deployment

The Cloud Function is deployed using Terraform from the project root directory.

```sh
make devops/terraform/apply
```
