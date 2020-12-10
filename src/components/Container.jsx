import React, { useState } from 'react';
import { Container as ReactContainer } from 'react-bootstrap';
import PopForm from './PopForm';
import ResultTable from './ResultTable';
import searchPopularForks from '../utils/search';

const Container = () => {
  const [forks, setForks] = useState();
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const onResult = (result) => {
    setForks(result.data.repository.forks.nodes);
    setLoading(false);
  };
  const onSubmit = (url) => {
    setLoading(true);
    searchPopularForks(url, onResult);
  };
  const resultTable = (
    forks
      ? (
        <ResultTable
          forks={forks}
          activePage={activePage}
          itemsCountPerPage={10}
          onPageChange={setActivePage}
        />
      )
      : null
  );
  return (
    <ReactContainer>
      <PopForm onSubmit={onSubmit} loading={loading} />
      {resultTable}
    </ReactContainer>
  );
};

export default Container;
