import { describe, it, test, expect, vi } from "vitest";
import React from "react";
import renderer from "react-test-renderer";
import Footer from "./Footer";

test("renders", () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("displays version from package.json", () => {
  const { version } = require("../../package.json");
  const tree = renderer.create(<Footer />).toJSON();
  expect(JSON.stringify(tree)).toContain(version);
});
