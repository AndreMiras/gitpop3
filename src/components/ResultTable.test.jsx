import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ResultTable from './ResultTable';

library.add(fab, fas);

const forks = [
  {
    nameWithOwner: 'django-nonrel/django',
    stargazerCount: 214,
    forkCount: 84,
    object: {
      committedDate: '2020-08-29T14:23:26Z',
      history: {
        totalCount: 13990,
      },
    },
  },
  {
    nameWithOwner: 'django/django',
    stargazerCount: 54330,
    forkCount: 23377,
    object: {
      committedDate: '2020-12-07:14:12Z',
      history: {
        totalCount: 29000,
      },
    },
  },
  {
    nameWithOwner: 'FlipperPA/django-mssql-backend',
    stargazerCount: 18,
    forkCount: 2,
    object: {
      committedDate: '2020-01-13:11:12Z',
      history: {
        totalCount: 28017,
      },
    },
  },
];

test('renders', () => {
  Date.now = jest.fn(() => new Date('2020-12-08T19:18:03.135Z').valueOf());
  const tree = renderer.create(
    <ResultTable forks={forks} activePage={1} itemsCountPerPage={2} onPageChange={() => null} />,
  ).toJSON();
  Date.now.mockRestore();
  expect(tree).toMatchSnapshot();
});

test('sorting', () => {
  render(
    <ResultTable forks={forks} activePage={1} itemsCountPerPage={1} onPageChange={() => null} />,
  );
  // sorted by stargazerCount default
  expect(screen.getByText(forks[1].nameWithOwner)).toBeInTheDocument();
  expect(screen.queryByText(forks[0].nameWithOwner)).not.toBeInTheDocument();
  expect(screen.queryByText(forks[2].nameWithOwner)).not.toBeInTheDocument();
  const repoTableHeader = screen.getByText('Repo');
  // let's sort by repo name
  fireEvent.click(repoTableHeader);
  expect(screen.queryByText('django/django')).not.toBeInTheDocument();
  expect(screen.queryByText('django-nonrel/django')).not.toBeInTheDocument();
  expect(screen.getByText('FlipperPA/django-mssql-backend')).toBeInTheDocument();
  // clicking again should invert it
  fireEvent.click(repoTableHeader);
  expect(screen.queryByText('django/django')).not.toBeInTheDocument();
  expect(screen.getByText('django-nonrel/django')).toBeInTheDocument();
  expect(screen.queryByText('FlipperPA/django-mssql-backend')).not.toBeInTheDocument();
  // same thing for stars
  const starsTableHeader = screen.getByText('Stars');
  // not so sure why it's ascending on first click when it should be descending
  fireEvent.click(starsTableHeader);
  fireEvent.click(starsTableHeader);
  expect(screen.getByText('django/django')).toBeInTheDocument();
  // forks
  const forksTableHeader = screen.getByText('Forks');
  fireEvent.click(forksTableHeader);
  expect(screen.getByText('django/django')).toBeInTheDocument();
  // commits
  const commitsTableHeader = screen.getByText('Commits');
  fireEvent.click(commitsTableHeader);
  expect(screen.getByText('django/django')).toBeInTheDocument();
  // modified date
  const modifiedTableHeader = screen.getByText('Modified');
  fireEvent.click(modifiedTableHeader);
  expect(screen.getByText('django/django')).toBeInTheDocument();
});
