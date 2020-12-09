import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import searchPopularForks from '../utils/search';
import Container from './Container';

library.add(fab, fas);
jest.mock('../utils/search');

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
];

const searchResult = {
  data: {
    repository: {
      forks: {
        nodes: forks,
      },
    },
  },
};

test('renders', () => {
  const tree = renderer.create(
    <Container />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('search forks', (done) => {
  render(<Container />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const submitButton = screen.getByRole('button', { type: 'submit' });
  const forkId = 'django-nonrel/django';
  searchPopularForks.mockImplementationOnce((url, onResult) => {
    onResult(searchResult);
    done();
  });
  expect(screen.queryByText(forkId)).toBeNull();
  fireEvent.change(searchInput, { target: { value: 'https://github.com/django/django' } });
  fireEvent.click(submitButton);
  expect(screen.queryByText(forkId)).toBeInTheDocument();
});
