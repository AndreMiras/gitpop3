import React from 'react';
import { Container as ReactContainer } from 'react-bootstrap';
import PopForm from './PopForm';
import { client, GET_FORKS_QUERY } from '../utils/graphql';

const re = /https:\/\/github.com\/(\w+)\/(\w+)/;
/**
 * Splits URL to owner and repo name.
 */
const splitUrl = (url) => (
  url.match(re).slice(1, 3)
);

const searchPopularForks = (url) => {
  const [owner, name] = splitUrl(url);
  client.query({
    query: GET_FORKS_QUERY,
    variables: { owner, name },
  }).then(
    (result) => result,
  );
};

const Container = () => (
  <ReactContainer>
    <PopForm onSubmit={(value) => searchPopularForks(value)} />
  </ReactContainer>
);

export default Container;
