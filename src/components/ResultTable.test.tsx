import { describe, it, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ResultTable from "./ResultTable";
import { originAndForks as forks } from "../utils/fixtures";
import { Node } from "../utils/types";

library.add(fab, fas);

test("renders", () => {
  const spy = vi
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-12-18T19:18:03.135Z").valueOf());
  const tree = renderer
    .create(
      <ResultTable
        forks={forks}
        activePage={1}
        itemsCountPerPage={2}
        onPageChange={() => null}
      />,
    )
    .toJSON();
  spy.mockRestore();
  expect(tree).toMatchSnapshot();
});

test("sorting", () => {
  render(
    <ResultTable
      forks={forks}
      activePage={1}
      itemsCountPerPage={1}
      onPageChange={() => null}
    />,
  );
  // sorted by stargazerCount default
  expect(screen.getByText(forks[0].nameWithOwner)).toBeInTheDocument();
  expect(screen.queryByText(forks[1].nameWithOwner)).not.toBeInTheDocument();
  expect(screen.queryByText(forks[2].nameWithOwner)).not.toBeInTheDocument();
  const repoTableHeader = screen.getByText("Repo");
  // let's sort by repo name
  fireEvent.click(repoTableHeader);
  expect(screen.queryByText("django/django")).not.toBeInTheDocument();
  expect(screen.queryByText("django-nonrel/django")).not.toBeInTheDocument();
  expect(
    screen.getByText("FlipperPA/django-mssql-backend"),
  ).toBeInTheDocument();
  // clicking again should invert it
  fireEvent.click(repoTableHeader);
  expect(screen.queryByText("django/django")).not.toBeInTheDocument();
  expect(screen.getByText("django-nonrel/django")).toBeInTheDocument();
  expect(
    screen.queryByText("FlipperPA/django-mssql-backend"),
  ).not.toBeInTheDocument();
  // same thing for stars
  const starsTableHeader = screen.getByText("Stars");
  // not so sure why it's ascending on first click when it should be descending
  fireEvent.click(starsTableHeader);
  fireEvent.click(starsTableHeader);
  expect(screen.getByText("django/django")).toBeInTheDocument();
  // forks
  const forksTableHeader = screen.getByText("Forks");
  fireEvent.click(forksTableHeader);
  expect(screen.getByText("django/django")).toBeInTheDocument();
  // commits
  const commitsTableHeader = screen.getByText("Commits");
  fireEvent.click(commitsTableHeader);
  expect(screen.getByText("django/django")).toBeInTheDocument();
  // modified date
  const modifiedTableHeader = screen.getByText("Modified");
  fireEvent.click(modifiedTableHeader);
  expect(screen.getByText("django/django")).toBeInTheDocument();
});

test("renders with empty forks array", () => {
  const emptyForks: Node[] = [];
  const tree = renderer
    .create(
      <ResultTable
        forks={emptyForks}
        activePage={1}
        itemsCountPerPage={10}
        onPageChange={() => null}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders table headers with empty data", () => {
  const emptyForks: Node[] = [];
  render(
    <ResultTable
      forks={emptyForks}
      activePage={1}
      itemsCountPerPage={10}
      onPageChange={() => null}
    />,
  );

  // Table headers should still render
  expect(screen.getByText("Repo")).toBeInTheDocument();
  expect(screen.getByText("Stars")).toBeInTheDocument();
  expect(screen.getByText("Forks")).toBeInTheDocument();
  expect(screen.getByText("Commits")).toBeInTheDocument();
  expect(screen.getByText("Modified")).toBeInTheDocument();
});
