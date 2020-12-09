import searchPopularForks from './search';
import { client } from './graphql';

test('basic case', (done) => {
  const url = 'https://github.com/django/django';
  const expected = {
    data: {
      repository: {
        forks: {
          nodes: [],
        },
      },
    },
  };
  const onResult = (result) => {
    expect(result).toEqual(expected);
    done();
  };
  const querySpy = jest.spyOn(client, 'query').mockReturnValue(Promise.resolve(expected));
  expect(
    searchPopularForks(
      url, onResult,
    ),
  );
  expect(querySpy).toHaveBeenNthCalledWith(
    1, { query: expect.any(Object), variables: { owner: 'django', name: 'django' } },
  );
});
