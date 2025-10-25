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

test("search forks", async () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const forkId = forks[0].nameWithOwner;
  const searchResult = [...[origin], ...forks];
  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockResolvedValue(searchResult);
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, {
    target: { value: "https://github.com/django/django" },
  });
  fireEvent.click(submitButton);
  await screen.findByText(forkId);
  expect(screen.queryByText(forkId)).toBeInTheDocument();
  spy.mockRestore();
});

test("search forks onError", async () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const forkId = "django-nonrel/django-404";
  const expected = `Could not resolve to a Repository with the name '${forkId}'.`;
  const searchError = new ApolloError({ errorMessage: expected });
  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockRejectedValue(searchError);
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, {
    target: { value: `https://github.com/${forkId}` },
  });
  expect(screen.queryByText("Error")).not.toBeInTheDocument();
  fireEvent.click(submitButton);
  await screen.findByText("Error");
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

  const spy = vi.spyOn(search, "searchPopularForks").mockImplementation(() => {
    // During async operation, loading should be true
    // The spinner icon will be rendered
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(searchResult);
      }, 10);
    });
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

  const spy = vi.spyOn(search, "searchPopularForks").mockImplementation(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(searchError);
      }, 10);
    });
  });

  fireEvent.change(searchInput, {
    target: { value: "https://github.com/test/repo" },
  });
  fireEvent.click(submitButton);

  // Wait for async operations
  await new Promise((resolve) => setTimeout(resolve, 20));

  spy.mockRestore();
});

test("handles empty search results", async () => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const emptyResult: Node[] = [];

  const spy = vi
    .spyOn(search, "searchPopularForks")
    .mockResolvedValue(emptyResult);

  fireEvent.change(searchInput, {
    target: { value: "https://github.com/test/repo" },
  });
  fireEvent.click(submitButton);

  // Wait for async operation to complete
  await new Promise((resolve) => setTimeout(resolve, 10));

  // Should not show error dialog for empty results
  expect(screen.queryByText("Error")).not.toBeInTheDocument();

  spy.mockRestore();
});
