import React, { useState } from 'react';
import { Container as ReactContainer } from 'react-bootstrap';
import PopForm from './PopForm';
import ResultTable from './ResultTable';
import { client, GET_FORKS_QUERY } from '../utils/graphql';

const re = /https:\/\/github.com\/(\w+)\/(\w+)/;
/**
 * Splits URL to owner and repo name.
 */
const splitUrl = (url) => (
  url.match(re).slice(1, 3)
);

const searchPopularForks = (url, onResult) => {
  const [owner, name] = splitUrl(url);
  client.query({
    query: GET_FORKS_QUERY,
    variables: { owner, name },
  }).then(
    (result) => onResult(result),
  );
};

const Container = () => {
  const [forks, setForks] = useState();
  const onResult = (result) => (
    setForks(result.data.repository.forks.nodes)
  );
  const resultTable = forks ? <ResultTable forks={forks} /> : null;
  return (
    <ReactContainer>
      <PopForm onSubmit={(url) => searchPopularForks(url, onResult)} />
      {resultTable}
    </ReactContainer>
  );
};

export default Container;
