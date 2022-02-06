import { client, GET_FORKS_QUERY } from "./graphql";
import { splitUrl } from "./validators";

const concatForksWithRepo = (result) => {
  const { forks, ...origin } = result.data.repository;
  return [...[origin], ...forks.nodes];
};

const searchPopularForks = (url, onResult, onError) => {
  const [owner, name] = splitUrl(url);
  client
    .query({
      query: GET_FORKS_QUERY,
      variables: { owner, name },
    })
    .then((result) => onResult(concatForksWithRepo(result)))
    .catch((error) => onError(error));
};

export default searchPopularForks;
