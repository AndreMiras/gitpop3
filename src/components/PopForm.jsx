import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PopForm = ({ onSubmit }) => {
  const [url, setUrl] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="https://github.com/django/django"
          onChange={(e) => setUrl(e.target.value)}
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-secondary" onClick={() => onSubmit(url)}>
            <FontAwesomeIcon icon="search" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
PopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PopForm;
