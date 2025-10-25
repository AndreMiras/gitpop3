import { FunctionComponent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopForm from "./PopForm";
import ResultTable from "./ResultTable";
import ErrorDialog from "./ErrorDialog";
import { searchPopularForks } from "../utils/search";
import { Node } from "../utils/types";
import { splitUrl } from "../utils/validators";

const Container: FunctionComponent = () => {
  const [forks, setForks] = useState<Node[]>();
  const [errorDetail, setErrorDetail] = useState<Error | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { owner, repo } = useParams<{ owner?: string; repo?: string }>();
  const navigate = useNavigate();

  // Auto-search from URL parameters on mount/route change
  useEffect(() => {
    if (owner && repo) {
      const url = `https://github.com/${owner}/${repo}`;
      setLoading(true); // Show loading indicator immediately
      searchPopularForks(url)
        .then((nodes) => {
          setForks(nodes);
          setErrorDetail(null);
          setLoading(false);
        })
        .catch((error) => {
          setErrorDetail(error as Error);
          setLoading(false);
        });
    }
  }, [owner, repo]);

  const onSubmit = async (url: string) => {
    setLoading(true);
    try {
      const nodes = await searchPopularForks(url);
      setForks(nodes);
      setErrorDetail(null);
      setLoading(false);

      // Navigate to new route after successful search
      const [extractedOwner, extractedRepo] = splitUrl(url) || [null, null];
      if (
        extractedOwner &&
        extractedRepo &&
        (!owner || !repo || owner !== extractedOwner || repo !== extractedRepo)
      ) {
        navigate(`/${extractedOwner}/${extractedRepo}`);
      }
    } catch (error) {
      setErrorDetail(error as Error);
      setLoading(false);
    }
  };

  // Pass initial URL to PopForm if we have route parameters
  const initialUrl =
    owner && repo ? `https://github.com/${owner}/${repo}` : undefined;

  return (
    <div className="container my-4">
      {errorDetail !== null && <ErrorDialog detail={errorDetail.message} />}
      {forks && (
        <ResultTable
          forks={forks}
          activePage={activePage}
          itemsCountPerPage={10}
          onPageChange={setActivePage}
        />
      )}
      <PopForm onSubmit={onSubmit} loading={loading} initialUrl={initialUrl} />
    </div>
  );
};

export default Container;
