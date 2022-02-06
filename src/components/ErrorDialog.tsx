import { FunctionComponent, useState } from "react";
import { Modal } from "react-bootstrap";

type ErrorDialogProps = {
  detail: string;
  onClose?: () => void;
};

const ErrorDialog: FunctionComponent<ErrorDialogProps> = ({
  detail,
  onClose,
}) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose && onClose();
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

export default ErrorDialog;
