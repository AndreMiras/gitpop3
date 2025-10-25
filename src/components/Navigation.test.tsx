import { describe, it, test, expect, vi } from "vitest";
import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";

library.add(fab, fas);

test("renders", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
