describe("client", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  it("REACT_APP_GITHUB_PAT is set OK by default", () => {
    const { client } = require("./graphql"); // eslint-disable-line global-require
    // simply check the client got initialised OK
    expect(typeof client.version).toEqual("string");
  });

  it("handles REACT_APP_GITHUB_PAT environment variable", () => {
    delete process.env.REACT_APP_GITHUB_PAT;
    expect(() => {
      require("./graphql"); // eslint-disable-line global-require
    }).toThrow("REACT_APP_GITHUB_PAT environment variable must be set");
  });
});

export {};
