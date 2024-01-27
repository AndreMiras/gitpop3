import assert from "assert";
import {
  gql,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
assert.ok(
  endpoint,
  "REACT_APP_GRAPHQL_ENDPOINT environment variable must be set"
);

const httpLink = createHttpLink({
  uri: endpoint,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const GET_FORKS_QUERY = gql`
  fragment RepositoryFields on Repository {
    nameWithOwner
    stargazerCount
    forkCount
    defaultBranchRef {
      target {
        ... on Commit {
          committedDate
          history {
            totalCount
          }
        }
      }
    }
  }

  query forks($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryFields
      forks(first: 100, orderBy: { field: STARGAZERS, direction: DESC }) {
        nodes {
          ...RepositoryFields
        }
      }
    }
  }
`;

export { client, GET_FORKS_QUERY };
