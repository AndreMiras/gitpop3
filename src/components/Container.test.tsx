import { ApolloError } from "@apollo/client";
import { fireEvent, render, screen } from "@testing-library/react";
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

test("search forks", (done) => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const forkId = forks[0].nameWithOwner;
  const searchResult = [...[origin], ...forks];
  const spy = jest
    .spyOn(search, "searchPopularForks")
    .mockImplementation((url, onResult, onError) => {
      onResult(searchResult);
      done();
    });
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, {
    target: { value: "https://github.com/django/django" },
  });
  fireEvent.click(submitButton);
  expect(screen.queryByText(forkId)).toBeInTheDocument();
  spy.mockRestore();
});

test("search forks onError", (done) => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole("button");
  const forkId = "django-nonrel/django-404";
  const expected = `Could not resolve to a Repository with the name '${forkId}'.`;
  const searchError = new ApolloError({ errorMessage: expected });
  const spy = jest
    .spyOn(search, "searchPopularForks")
    .mockImplementation((url, onResult, onError) => {
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
  spy.mockRestore();
});
