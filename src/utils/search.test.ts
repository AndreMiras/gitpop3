import { ApolloQueryResult, ApolloError } from "@apollo/client";
import searchPopularForks from "./search";
import { Node } from "./types";
import { client } from "./graphql";

test("basic case", (done) => {
  const url = "https://github.com/django/django";
  const forks = {
    nodes: [],
  };
  const origin = {
    nameWithOwner: "django/django",
    stargazerCount: 54393,
    forkCount: 23386,
    object: {
      committedDate: "2020-12-18T08:23:22Z",
      history: {
        totalCount: 29060,
      },
    },
  };
  const repository = {
    ...origin,
    forks,
  };
  const queryResult = {
    data: {
      repository,
    },
  };
  const expected = [...[origin], ...forks.nodes];
  const onResult = (result: Node[]) => {
    expect(result).toEqual(expected);
    done();
  };
  // test should fail onError
  const onError = (error: ApolloError) => done(error);
  const querySpy = jest
    .spyOn(client, "query")
    .mockReturnValue(Promise.resolve(queryResult as ApolloQueryResult<any>));
  searchPopularForks(url, onResult, onError);
  expect(querySpy).toHaveBeenNthCalledWith(1, {
    query: expect.any(Object),
    variables: { owner: "django", name: "django" },
  });
  querySpy.mockRestore();
});

test("onError", (done) => {
  const url = "https://github.com/django/django-404";
  const expected =
    "Could not resolve to a Repository with the name 'django/django-404'.";
  // test should fail onResult
  const onResult = (result: Node[]) => done(result);
  const onError = (error: ApolloError) => {
    expect(error).toEqual(new ApolloError({ errorMessage: expected }));
    expect(error.message).toEqual(expected);
    done();
  };
  const querySpy = jest
    .spyOn(client, "query")
    .mockReturnValue(
      Promise.reject(new ApolloError({ errorMessage: expected }))
    );
  searchPopularForks(url, onResult, onError);
  expect(querySpy).toHaveBeenNthCalledWith(1, {
    query: expect.any(Object),
    variables: { owner: "django", name: "django-404" },
  });
  querySpy.mockRestore();
});
