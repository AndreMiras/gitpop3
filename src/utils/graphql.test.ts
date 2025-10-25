import { describe, it, expect } from "vitest";
import { client } from "./graphql";

describe("client", () => {
  it("VITE_GRAPHQL_ENDPOINT is set OK by default", () => {
    // simply check the client got initialised OK
    expect(typeof client.version).toEqual("string");
  });
});
