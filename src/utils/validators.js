const repoRegex = /https?:\/\/github.com\/([\w-_.]+)\/([\w-_.]+)/;

const urlMatch = (url) => (
  url && url.match(repoRegex) || null
);

/**
 * Splits URL to owner and repo name.
 */
const splitUrl = (url) => (
  urlMatch(url) && urlMatch(url).slice(1, 3)
);

export {
  urlMatch,
  splitUrl,
};
