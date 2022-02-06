import { splitUrl, urlMatch } from "./validators";

const validMatch = ["AndreMiras", "gitpop3"];
const invalidMatch = null;
describe.each([
  // default case
  ["https://github.com/AndreMiras/gitpop3", validMatch],
  // HTTP only should be supported
  ["http://github.com/AndreMiras/gitpop3", validMatch],
  // repo and path is OK
  ["https://github.com/AndreMiras/gitpop3/blob/develop/README.md", validMatch],
  // dashes
  [
    "https://github.com/kivy/python-for-android",
    ["kivy", "python-for-android"],
  ],
  // dots, refs #12
  [
    "https://github.com/aybe/Windows-API-Code-Pack-1.1",
    ["aybe", "Windows-API-Code-Pack-1.1"],
  ],
  // incomplete is invalid
  ["https://github.com/AndreMiras", invalidMatch],
  // empty is invalid
  ["", invalidMatch],
  [null, invalidMatch],
])("urlMatch('%s') and splitUrl('%s')", (url, expected) => {
  test("urlMatch", () => {
    const actualUrlMatch = urlMatch(url);
    expect(actualUrlMatch && actualUrlMatch.slice(1)).toEqual(expected);
    const actualSplitUrl = splitUrl(url);
    expect(actualSplitUrl).toEqual(expected);
  });
});
