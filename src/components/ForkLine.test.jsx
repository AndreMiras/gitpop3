import React from 'react';
import renderer from 'react-test-renderer';
import ForkLine from './ForkLine';

test('renders', () => {
  const info = {
    nameWithOwner: 'django/django',
    stargazerCount: 123,
    forkCount: 321,
    object: {
      committedDate: '2020-08-29T14:23:26Z',
      history: {
        totalCount: 1234,
      },
    },
  };
  const tree = renderer.create(
    <ForkLine info={info} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
