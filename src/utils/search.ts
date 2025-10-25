import { ApolloError } from "@apollo/client";
import { client, GET_FORKS_QUERY } from "./graphql";
import { splitUrl } from "./validators";
import { Node, Result } from "./types";

const concatForksWithRepo = (result: Result) => {
  const { forks, ...origin } = result.data.repository;
  return [...[origin], ...forks.nodes];
};

const searchPopularForks = async (url: string): Promise<Node[]> => {
  const [owner, name] = splitUrl(url) || [null, null];
  const result = await client.query({
    query: GET_FORKS_QUERY,
    variables: { owner, name },
  });
  return concatForksWithRepo(result);
};

export { searchPopularForks };
