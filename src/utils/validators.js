const repoRegex = /https:\/\/github.com\/(\w+)\/(\w+)/;
const urlMatch = (url) => (
  url && url.match(repoRegex)
);

export default urlMatch;
