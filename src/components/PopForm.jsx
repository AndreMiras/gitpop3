import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PopForm = ({ onSubmit }) => {
  const [value, setValue] = useState();
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="https://github.com/django/django"
        onChange={(e) => setValue(e.target.value)}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={() => onSubmit(value)}>
          <FontAwesomeIcon icon="search" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
PopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PopForm;
