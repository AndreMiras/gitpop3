# GitPop3

[![Tests](https://github.com/AndreMiras/gitpop3/actions/workflows/tests.yml/badge.svg)](https://github.com/AndreMiras/gitpop3/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/AndreMiras/gitpop3/badge.svg?branch=develop)](https://coveralls.io/github/AndreMiras/gitpop3?branch=develop)
[![Deploy](https://github.com/AndreMiras/gitpop3/actions/workflows/deploy.yml/badge.svg)](https://github.com/AndreMiras/gitpop3/actions/workflows/deploy.yml)

Find the most popular fork on GitHub.

<https://andremiras.github.io/gitpop3/>

GitPop3 helps you choose a fork when a project goes unmaintained.
It allows you to sort forks by "Stars", "Forks" or "Commits" count.
![Screenshot](https://i.imgur.com/4Ac311o.png)
See [GitPop2](https://github.com/AndreMiras/gitpop2) for the same tool using backend tech.

## Run

```sh
yarn start
```

## Test

```sh
yarn lint
yarn test
```

## Deployment

The app can be deployed on GitHub pages when releasing via:

```sh
yarn deploy
```

Note a [Personal Access Token](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql) should be generated with the `public_repo` scope and set to its base64 form to the `REACT_APP_GITHUB_PAT` environment variable.
This is required for [Authenticating with GraphQL](https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql).

## Cloud Function

See the [serverless](serverless) folder documentation.
