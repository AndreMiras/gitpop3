import React from 'react';
import renderer from 'react-test-renderer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ResultTable from './ResultTable';

library.add(fab, fas);

test('renders', () => {
  const forks = [
    {
      nameWithOwner: 'django-nonrel/django',
      stargazerCount: 214,
      forkCount: 84,
      pushedAt: '2020-08-29T14:23:26Z',
      object: {
        history: {
          totalCount: 13990,
        },
      },
    },
    {
      nameWithOwner: 'django/django',
      stargazerCount: 26,
      forkCount: 2,
      pushedAt: '2020-02-17:11:12Z',
      object: {
        history: {
          totalCount: 26823,
        },
      },
    },
    {
      nameWithOwner: 'FlipperPA/django-mssql-backend',
      stargazerCount: 18,
      forkCount: 2,
      pushedAt: '2020-01-13:11:12Z',
      object: {
        history: {
          totalCount: 28017,
        },
      },
    },
  ];
  Date.now = jest.fn(() => new Date('2020-12-08T19:18:03.135Z').valueOf());
  const tree = renderer.create(
    <ResultTable forks={forks} activePage={1} itemsCountPerPage={2} onPageChange={() => null} />,
  ).toJSON();
  Date.now.mockRestore();
  expect(tree).toMatchSnapshot();
});
