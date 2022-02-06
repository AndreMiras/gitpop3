import React, { FormEvent, FunctionComponent, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { urlMatch } from "../utils/validators";

type SearchIconProps = {
  loading: boolean;
};

const SearchIcon: FunctionComponent<SearchIconProps> = ({ loading }) => (
  <FontAwesomeIcon icon={loading ? "spinner" : "search"} spin={loading} />
);

type PopFormProps = {
  onSubmit: (url: string) => void;
  loading: boolean;
};

const PopForm: FunctionComponent<PopFormProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState("");
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
      <InputGroup className="mb-3">
        <FormControl
          placeholder="https://github.com/django/django"
          onChange={(e) => setUrl(e.target.value)}
          isInvalid={isInvalid}
        />
        <InputGroup.Append>
          <Button
            type="submit"
            variant="outline-secondary"
            onClick={handleSubmit}
          >
            <SearchIcon loading={loading} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default PopForm;
