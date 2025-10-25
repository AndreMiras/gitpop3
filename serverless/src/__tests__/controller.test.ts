import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Request, Response } from "express";

const { setCors, main } = await import("../controller");

describe("setCors", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let setHeaderSpy: ReturnType<typeof vi.fn>;
  let setSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setHeaderSpy = vi.fn();
    setSpy = vi.fn();
    res = {
      setHeader: setHeaderSpy,
      set: setSpy,
    };
  });

  it("sets CORS headers for allowed origin", () => {
    req = {
      headers: { origin: "https://andremiras.github.io" },
    };
    const allowedOrigins = ["https://andremiras.github.io"];

    setCors(req as Request, res as Response, allowedOrigins);

    expect(setHeaderSpy).toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      "https://andremiras.github.io"
    );
    expect(setSpy).toHaveBeenCalledWith(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS"
    );
    expect(setSpy).toHaveBeenCalledWith(
      "Access-Control-Allow-Headers",
      "Content-Type"
    );
  });

  it("does not set origin header for unauthorized origin", () => {
    req = {
      headers: { origin: "https://evil.com" },
    };
    const allowedOrigins = ["https://andremiras.github.io"];

    setCors(req as Request, res as Response, allowedOrigins);

    expect(setHeaderSpy).not.toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      "https://evil.com"
    );
    // Should still set other CORS headers
    expect(setSpy).toHaveBeenCalledWith(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS"
    );
  });
});

describe("main", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusSpy: ReturnType<typeof vi.fn>;
  let sendSpy: ReturnType<typeof vi.fn>;
  let setHeaderSpy: ReturnType<typeof vi.fn>;
  let setSpy: ReturnType<typeof vi.fn>;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original env
    originalEnv = { ...process.env };

    // Set up mock response
    statusSpy = vi.fn().mockReturnThis();
    sendSpy = vi.fn();
    setHeaderSpy = vi.fn();
    setSpy = vi.fn();

    res = {
      status: statusSpy,
      send: sendSpy,
      setHeader: setHeaderSpy,
      set: setSpy,
    };

    req = {
      headers: { origin: "https://andremiras.github.io" },
      body: { query: "{ repository { name } }" },
    };

    // Set up environment variables
    process.env.GITHUB_GRAPHQL_API_URL = "https://api.github.com/graphql";
    process.env.GITHUB_PAT = "test_token_12345";
    process.env.ALLOWED_ORIGINS = "https://andremiras.github.io";
  });

  afterEach(() => {
    // Restore original env
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns 500 if environment variables not configured", async () => {
    delete process.env.GITHUB_GRAPHQL_API_URL;

    await main(req as Request, res as Response);

    expect(statusSpy).toHaveBeenCalledWith(500);
    expect(sendSpy).toHaveBeenCalledWith(
      "GitHub API URL or PAT is not configured."
    );
  });

  it("forwards request to GitHub API with authentication", async () => {
    const mockGitHubResponse = { data: { repository: { name: "test-repo" } } };
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      text: async () => JSON.stringify(mockGitHubResponse),
    });

    // Mock global fetch
    global.fetch = mockFetch;

    await main(req as Request, res as Response);

    // Verify fetch was called with correct parameters
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: "Bearer test_token_12345",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "{ repository { name } }" }),
      })
    );

    // Verify response was sent correctly
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(sendSpy).toHaveBeenCalledWith(JSON.stringify(mockGitHubResponse));
  });
});
