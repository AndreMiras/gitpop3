import {
  gql, ApolloClient, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const endpoint = 'https://api.github.com/graphql';

const httpLink = createHttpLink({
  uri: endpoint,
});

const token = '611e97c7dd4ef573efcd31e63e9aed084243d282';

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
