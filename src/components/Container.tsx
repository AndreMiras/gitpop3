import { FunctionComponent, useState } from "react";
import { Container as ReactContainer } from "react-bootstrap";
import PopForm from "./PopForm";
import ResultTable from "./ResultTable";
import ErrorDialog from "./ErrorDialog";
import { searchPopularForks } from "../utils/search";
import { Node } from "../utils/types";

const Container: FunctionComponent = () => {
  const [forks, setForks] = useState<Node[]>();
  const [errorDetail, setErrorDetail] = useState<Error | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const onResult = (nodes: Node[]) => {
    setForks(nodes);
    setErrorDetail(null);
    setLoading(false);
  };
  const onError = (error: Error) => {
    setErrorDetail(error);
    setLoading(false);
  };
  const errorDialog = errorDetail ? (
    <ErrorDialog detail={errorDetail.message} />
  ) : null;
  const onSubmit = (url: string) => {
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
