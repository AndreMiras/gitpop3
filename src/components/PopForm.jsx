import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { urlMatch } from '../utils/validators';

const SearchIcon = ({ loading }) => (
  <FontAwesomeIcon icon={loading ? 'spinner' : 'search'} spin={loading} />
);
SearchIcon.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const PopForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (urlMatch(url) === null) {
      e.stopPropagation();
    } else {
      onSubmit(url);
    }
  };
  const isInvalid = url && urlMatch(url) === null;
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="https://github.com/django/django"
          onChange={(e) => setUrl(e.target.value)}
          isInvalid={isInvalid}
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-secondary" onClick={handleSubmit}>
            <SearchIcon loading={loading} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
PopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PopForm;
