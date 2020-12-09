import React from 'react';
import renderer from 'react-test-renderer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import PopForm from './PopForm';

library.add(fas);

test('renders', () => {
  const onSubmit = () => ({});
  const tree = renderer.create(
    <PopForm onSubmit={onSubmit} loading={false} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
