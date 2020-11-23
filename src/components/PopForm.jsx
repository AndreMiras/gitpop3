import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PopForm = () => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder="https://github.com/django/django"
    />
    <InputGroup.Append>
      <Button variant="outline-secondary">
        <FontAwesomeIcon icon="search" />
      </Button>
    </InputGroup.Append>
  </InputGroup>
);

export default PopForm;
