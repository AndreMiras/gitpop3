import { Request, Response } from "express";
import { HttpFunction } from "@google-cloud/functions-framework";

/**
 * Sets CORS headers on the response based on the request's origin.
 * Allows only origins specified in the allowedOrigins array.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @param {string[]} allowedOrigins - A list of allowed origins for CORS.
 */
const setCors = (req: Request, res: Response, allowedOrigins: string[]) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
};

/**
 * Main function for handling incoming HTTP requests.
 * Forwards the request to the GitHub GraphQL API with appropriate authorization.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 */
const main: HttpFunction = async (req: Request, res: Response) => {
  const githubApiUrl = process.env.GITHUB_GRAPHQL_API_URL;
  const githubPat = process.env.GITHUB_PAT;
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
  if (!githubApiUrl || !githubPat) {
    res.status(500).send("GitHub API URL or PAT is not configured.");
    return;
  }
  setCors(req, res, allowedOrigins);
  try {
    const response = await fetch(githubApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubPat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Error forwarding request to GitHub:", error);
    res.status(500).send("Error forwarding request to GitHub.");
  }
};

export { main };
