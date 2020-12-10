import { urlMatch } from './validators';

const validMatch = ['AndreMiras', 'gitpop3'];
const invalidMatch = null;
describe.each([
  // default case
  ['https://github.com/AndreMiras/gitpop3', validMatch],
  // HTTP only should be supported
  ['http://github.com/AndreMiras/gitpop3', validMatch],
  // repo and path is OK
  ['https://github.com/AndreMiras/gitpop3/blob/develop/README.md', validMatch],
  // incomplete is invalid
  ['https://github.com/AndreMiras', invalidMatch],
  // empty is invalid
  ['', invalidMatch],
])("urlMatch('%s')", (url, expected) => {
  test('urlMatch', () => {
    const actual = urlMatch(url);
    expect(actual && actual.slice(1)).toEqual(expected);
  });
});
