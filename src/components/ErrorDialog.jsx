import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ErrorDialog = ({ detail, onClose }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose();
  };

  // note animation is disabled to workaround an upstream issue:
  // https://github.com/react-bootstrap/react-bootstrap/issues/5075
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton className="bg-warning">
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{detail}</Modal.Body>
    </Modal>
  );
};
ErrorDialog.propTypes = {
  detail: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
ErrorDialog.defaultProps = {
  onClose: () => null,
};

export default ErrorDialog;
