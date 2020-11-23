# GitPop3

[![Tests](https://github.com/AndreMiras/gitpop3/workflows/Tests/badge.svg?branch=develop)](https://github.com/AndreMiras/gitpop3/actions?query=workflow%3ATests)
[![Deploy](https://github.com/AndreMiras/gitpop3/workflows/Deploy/badge.svg?branch=develop)](https://github.com/AndreMiras/gitpop3/actions?query=workflow%3ADeploy)

Find the most popular fork on GitHub.

<https://andremiras.github.io/gitpop3/>

This is a rewrite of [GitPop2](https://github.com/AndreMiras/gitpop2) using only frontend tech.

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
Note a [Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) should be generated and set to its base64 form to the `REACT_APP_GITHUB_PAT` environment variable.
This is required for [Authenticating with GraphQL](https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql).
