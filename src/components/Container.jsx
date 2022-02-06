import React, { useState } from "react";
import { Container as ReactContainer } from "react-bootstrap";
import PopForm from "./PopForm";
import ResultTable from "./ResultTable";
import ErrorDialog from "./ErrorDialog";
import searchPopularForks from "../utils/search";

const Container = () => {
  const [forks, setForks] = useState();
  const [errorDetail, setErrorDetail] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const onResult = (nodes) => {
    setForks(nodes);
    setErrorDetail(null);
    setLoading(false);
  };
  const onError = (error) => {
    setErrorDetail(error);
    setLoading(false);
  };
  const errorDialog = errorDetail ? (
    <ErrorDialog detail={errorDetail.message} />
  ) : null;
  const onSubmit = (url) => {
    setLoading(true);
    searchPopularForks(url, onResult, onError);
  };
  const resultTable = forks ? (
    <ResultTable
      forks={forks}
      activePage={activePage}
      itemsCountPerPage={10}
      onPageChange={setActivePage}
    />
  ) : null;
  return (
    <ReactContainer>
      {errorDialog}
      <PopForm onSubmit={onSubmit} loading={loading} />
      {resultTable}
    </ReactContainer>
  );
};

export default Container;
