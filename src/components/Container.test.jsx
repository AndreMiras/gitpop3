import React from "react";
import { ApolloError } from "@apollo/client";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import searchPopularForks from "../utils/search";
import Container from "./Container";

library.add(fab, fas);
jest.mock("../utils/search");

test("renders", () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("search forks", (done) => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button", { type: "submit" });
  const forkId = "django-nonrel/django";
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
  const forks = [
    {
      nameWithOwner: forkId,
      stargazerCount: 214,
      forkCount: 84,
      object: {
        committedDate: "2020-08-29T14:23:26Z",
        history: {
          totalCount: 13990,
        },
      },
    },
  ];
  const searchResult = [...[origin], ...forks];
  searchPopularForks.mockImplementationOnce((url, onResult, onError) => {
    onResult(searchResult);
    onError; // peaces linter mind
    done();
  });
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, {
    target: { value: "https://github.com/django/django" },
  });
  fireEvent.click(submitButton);
  expect(screen.queryByText(forkId)).toBeInTheDocument();
});

test("search forks onError", (done) => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button", { type: "submit" });
  const forkId = "django-nonrel/django-404";
  const expected = `Could not resolve to a Repository with the name '${forkId}'.`;
  const searchError = new ApolloError({ errorMessage: expected });
  searchPopularForks.mockImplementationOnce((url, onResult, onError) => {
    onResult; // pieaces linter mind
    onError(searchError);
    done();
  });
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, {
    target: { value: `https://github.com/${forkId}` },
  });
  expect(screen.queryByText("Error")).not.toBeInTheDocument();
  fireEvent.click(submitButton);
  expect(screen.queryByText("Error")).toBeInTheDocument();
});
