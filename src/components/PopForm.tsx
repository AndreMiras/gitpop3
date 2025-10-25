import React, {
  FormEvent,
  FunctionComponent,
  useState,
  useEffect,
} from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { urlMatch } from "../utils/validators";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const SearchIcon: FunctionComponent<{ loading: boolean }> = ({ loading }) => {
  const icon = loading ? ("spinner" as IconProp) : ("search" as IconProp);
  const spin = loading ? true : false;
  return <FontAwesomeIcon icon={icon} spin={spin} />;
};

type PopFormProps = {
  onSubmit: (url: string) => void;
  loading: boolean;
  initialUrl?: string;
};

const PopForm: FunctionComponent<PopFormProps> = ({
  onSubmit,
  loading,
  initialUrl,
}) => {
  const [url, setUrl] = useState(initialUrl || "");

  // Update local state if initialUrl prop changes
  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (urlMatch(url) === null) {
      e.stopPropagation();
    } else {
      onSubmit(url);
    }
  };

  const isInvalid = url !== "" && urlMatch(url) === null;

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="my-3">
        <FormControl
          placeholder="https://github.com/django/django"
          onChange={(e) => setUrl(e.target.value)}
          isInvalid={isInvalid}
          value={url}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          <SearchIcon loading={loading} />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default PopForm;
