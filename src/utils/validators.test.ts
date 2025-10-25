import { describe, it, test, expect, vi } from "vitest";
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
  // trailing slash should still match
  ["https://github.com/AndreMiras/gitpop3/", validMatch],
  // query parameters should be ignored (match owner/repo only)
  ["https://github.com/AndreMiras/gitpop3?tab=readme", validMatch],
  // anchors should be ignored
  ["https://github.com/AndreMiras/gitpop3#installation", validMatch],
  // combination: path, query, and anchor
  [
    "https://github.com/AndreMiras/gitpop3/blob/develop/README.md?plain=1#L10",
    validMatch,
  ],
  // underscores in owner name
  ["https://github.com/my_org/repository-name", ["my_org", "repository-name"]],
  // underscores in repo name
  ["https://github.com/owner/my_repo_name", ["owner", "my_repo_name"]],
  // multiple dots in repo name
  [
    "https://github.com/microsoft/dotnet.core.api",
    ["microsoft", "dotnet.core.api"],
  ],
  // www prefix (may fail - testing current behavior)
  ["https://www.github.com/AndreMiras/gitpop3", invalidMatch],
  // case sensitivity check (GitHub.com vs github.com)
  ["https://GitHub.com/AndreMiras/gitpop3", invalidMatch],
  // no protocol (should fail)
  ["github.com/AndreMiras/gitpop3", invalidMatch],
  // special characters not in regex (partially matches up to @)
  ["https://github.com/owner/repo@name", ["owner", "repo"]],
  // spaces (partially matches up to space)
  ["https://github.com/owner/repo name", ["owner", "repo"]],
  // very long but valid repo name (100 chars)
  [`https://github.com/owner/${"a".repeat(100)}`, ["owner", "a".repeat(100)]],
])("urlMatch('%s') and splitUrl('%s')", (url, expected) => {
  test("urlMatch", () => {
    const actualUrlMatch = urlMatch(url);
    expect(actualUrlMatch && actualUrlMatch.slice(1)).toEqual(expected);
    const actualSplitUrl = splitUrl(url);
    expect(actualSplitUrl).toEqual(expected);
  });
});
