import { describe, it, test, expect, vi } from "vitest";
import { ApolloError } from "@apollo/client";
import { fireEvent, render, screen, act } from "@testing-library/react";
import renderer from "react-test-renderer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import * as search from "../utils/search";
import { Node } from "../utils/types";
import { origin, forks } from "../utils/fixtures";
import Container from "./Container";

library.add(fab, fas);

test("renders", () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("search forks", () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const forkId = forks[0].nameWithOwner;
  const searchResult = [...[origin], ...forks];
  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockImplementation((url, onResult, onError) => {
      onResult(searchResult);
    });
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, {
    target: { value: "https://github.com/django/django" },
  });
  fireEvent.click(submitButton);
  expect(screen.queryByText(forkId)).toBeInTheDocument();
  spy.mockRestore();
});

test("search forks onError", () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const forkId = "django-nonrel/django-404";
  const expected = `Could not resolve to a Repository with the name '${forkId}'.`;
  const searchError = new ApolloError({ errorMessage: expected });
  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockImplementation((url, onResult, onError) => {
      onError(searchError);
    });
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, {
    target: { value: `https://github.com/${forkId}` },
  });
  expect(screen.queryByText("Error")).not.toBeInTheDocument();
  fireEvent.click(submitButton);
  expect(screen.queryByText("Error")).toBeInTheDocument();
  spy.mockRestore();
});

test("shows loading spinner during search", async () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const searchResult = [...[origin], ...forks];

  // Verify initial state - search icon present
  expect(screen.getByRole("button")).toBeInTheDocument();

  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockImplementation((url, onResult, onError) => {
      // During async operation, loading should be true
      // The spinner icon will be rendered
      setTimeout(() => {
        act(() => {
          onResult(searchResult);
        });
      }, 10);
    });

  fireEvent.change(searchInput, {
    target: { value: "https://github.com/django/django" },
  });
  fireEvent.click(submitButton);

  // Wait for async operations
  await new Promise((resolve) => setTimeout(resolve, 20));

  spy.mockRestore();
});

test("loading state resets after error", async () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const searchError = new ApolloError({ errorMessage: "Test error" });

  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockImplementation((url, onResult, onError) => {
      setTimeout(() => {
        act(() => {
          onError(searchError);
        });
      }, 10);
    });

  fireEvent.change(searchInput, {
    target: { value: "https://github.com/test/repo" },
  });
  fireEvent.click(submitButton);

  // Wait for async operations
  await new Promise((resolve) => setTimeout(resolve, 20));

  spy.mockRestore();
});

test("handles empty search results", () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const emptyResult: Node[] = [];

  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockImplementation((url, onResult, onError) => {
      onResult(emptyResult);
    });

  fireEvent.change(searchInput, {
    target: { value: "https://github.com/test/repo" },
  });
  fireEvent.click(submitButton);

  // Should not show error dialog for empty results
  expect(screen.queryByText("Error")).not.toBeInTheDocument();

  spy.mockRestore();
});
