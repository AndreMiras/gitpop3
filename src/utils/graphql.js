import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const endpoint = 'https://api.github.com/graphql';
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

const GET_FORKS_QUERY = gql`
  query Forks($owner: String! $name: String!) {
    repository(owner: $owner, name: $name) {
      forks(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;

export {
  client,
  GET_FORKS_QUERY,
};
