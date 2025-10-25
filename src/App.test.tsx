import { describe, it, test, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  const linkElement = screen.getByText(/GitPop3/);
  expect(linkElement).toBeInTheDocument();
});
