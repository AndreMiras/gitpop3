import { ApolloError } from "@apollo/client";
import { client, GET_FORKS_QUERY } from "./graphql";
import { splitUrl } from "./validators";
import { Node, Result } from "./types";

const concatForksWithRepo = (result: Result) => {
  const { forks, ...origin } = result.data.repository;
  return [...[origin], ...forks.nodes];
};

const searchPopularForks = (
  url: string,
  onResult: (result: Node[]) => void,
  onError: (error: ApolloError) => void
) => {
  const [owner, name] = splitUrl(url) || [null, null];
  client
    .query({
      query: GET_FORKS_QUERY,
      variables: { owner, name },
    })
    .then((result) => onResult(concatForksWithRepo(result)))
    .catch((error) => onError(error));
};

export default searchPopularForks;
