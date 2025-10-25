const repoRegex = /https?:\/\/github.com\/([\w-_.]+)\/([\w-_.]+)/;

const urlMatch = (url: string | null) => url?.match(repoRegex) || null;

/**
 * Splits URL to owner and repo name.
 */
const splitUrl = (url: string | null) => urlMatch(url)?.slice(1, 3) || null;

export { urlMatch, splitUrl };
