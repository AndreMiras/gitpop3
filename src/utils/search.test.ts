import { describe, it, test, expect, vi } from "vitest";
import { ApolloQueryResult, ApolloError } from "@apollo/client";
import { searchPopularForks } from "./search";
import { Node } from "./types";
import { client } from "./graphql";
import { origin } from "./fixtures";

test("basic case", async () => {
  const url = "https://github.com/django/django";
  const forks = {
    nodes: [],
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

  const querySpy = vi
    .spyOn(client, "query")
    .mockReturnValue(Promise.resolve(queryResult as ApolloQueryResult<any>));

  const result = await searchPopularForks(url);

  expect(result).toEqual(expected);
  expect(querySpy).toHaveBeenNthCalledWith(1, {
    query: expect.any(Object),
    variables: { owner: "django", name: "django" },
  });
  querySpy.mockRestore();
});

test("onError", async () => {
  const url = "https://github.com/django/django-404";
  const expected =
    "Could not resolve to a Repository with the name 'django/django-404'.";

  const querySpy = vi
    .spyOn(client, "query")
    .mockReturnValue(
      Promise.reject(new ApolloError({ errorMessage: expected })),
    );

  await expect(searchPopularForks(url)).rejects.toEqual(
    new ApolloError({ errorMessage: expected }),
  );

  expect(querySpy).toHaveBeenNthCalledWith(1, {
    query: expect.any(Object),
    variables: { owner: "django", name: "django-404" },
  });
  querySpy.mockRestore();
});
