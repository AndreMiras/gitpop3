import { client, GET_FORKS_QUERY } from './graphql';
import urlMatch from './validators';

/**
 * Splits URL to owner and repo name.
 */
const splitUrl = (url) => (
  urlMatch(url).slice(1, 3)
);

const searchPopularForks = (url, onResult) => {
  const [owner, name] = splitUrl(url);
  client.query({
    query: GET_FORKS_QUERY,
    variables: { owner, name },
  }).then(
    (result) => onResult(result),
  );
};

export default searchPopularForks;
