import { describe, it, test, expect, vi } from "vitest";
import React from "react";
import renderer from "react-test-renderer";
import RepoLink from "./RepoLink";

test("renders", () => {
  const tree = renderer
    .create(<RepoLink nameWithOwner="django/Django" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
