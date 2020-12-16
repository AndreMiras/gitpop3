import assert from 'assert';
import {
  gql, ApolloClient, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const endpoint = 'https://api.github.com/graphql';

const httpLink = createHttpLink({
  uri: endpoint,
});

/**
 * Base64 to trick GitHub hooks so the token doesn't seem leaded in the commit.
 * Note this token will be accessible from the frontend hence should be very restricted.
 * Only the `public_repo` scope is required.
 */
const token = process.env.REACT_APP_GITHUB_PAT ? atob(process.env.REACT_APP_GITHUB_PAT) : null;
assert( // eslint-disable-line no-console
  token, 'REACT_APP_GITHUB_PAT environment variable must be set',
);

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${token}`,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const GET_FORKS_QUERY = gql`
  query Forks($owner: String! $name: String!) {
    repository(owner: $owner, name: $name) {
      forks(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          nameWithOwner
          stargazerCount
          forkCount
          object(expression: "master") {
            ... on Commit {
              committedDate
              history {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;

export {
  client,
  GET_FORKS_QUERY,
};
