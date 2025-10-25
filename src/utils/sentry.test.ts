import { describe, it, expect } from "vitest";
import setupSentry from "./sentry";

describe("client", () => {
  it("production settings", () => {
    expect(setupSentry()).toBe(false);
  });
});
