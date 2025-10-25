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

  return new Promise<void>((resolve, reject) => {
    const onResult = (result: Node[]) => {
      try {
        expect(result).toEqual(expected);
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    // test should fail onError
    const onError = (error: ApolloError) => reject(error);
    const querySpy = vi
      .spyOn(client, "query")
      .mockReturnValue(Promise.resolve(queryResult as ApolloQueryResult<any>));
    searchPopularForks(url, onResult, onError);
    expect(querySpy).toHaveBeenNthCalledWith(1, {
      query: expect.any(Object),
      variables: { owner: "django", name: "django" },
    });
    querySpy.mockRestore();
  });
});

test("onError", async () => {
  const url = "https://github.com/django/django-404";
  const expected =
    "Could not resolve to a Repository with the name 'django/django-404'.";

  return new Promise<void>((resolve, reject) => {
    // test should fail onResult
    const onResult = (result: Node[]) =>
      reject(new Error("Should have failed"));
    const onError = (error: ApolloError) => {
      try {
        expect(error).toEqual(new ApolloError({ errorMessage: expected }));
        expect(error.message).toEqual(expected);
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    const querySpy = vi
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
});
