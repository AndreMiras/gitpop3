const repoRegex = /https?:\/\/github.com\/(\w+)\/(\w+)/;

const urlMatch = (url) => (
  url && url.match(repoRegex)
);

/**
 * Splits URL to owner and repo name.
 */
const splitUrl = (url) => (
  urlMatch(url).slice(1, 3)
);

export {
  urlMatch,
  splitUrl,
};
