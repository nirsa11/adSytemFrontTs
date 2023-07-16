import Modal, { ModalProps } from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';

/**
 * A React functional component that renders a modal UI with a title and children components.
 * @param {ModalProps} onHide - A function to handle the modal hide event.
 * @param {boolean} show - A boolean value indicating whether the modal should be shown or not.
 * @param {string} title - The title of the modal.
 * @param {React.ReactNode} children - The children components to be rendered inside the modal body.
 * @returns A React component that renders a modal UI.
 */
export const ModalUIComponent: React.FC<ModalProps> = ({ onHide, show, title, children }) => {
  return (
    <Modal onHide={onHide} show={show} centered className="modal-ui col-12" style={{ zIndex: '1051' }}>
      <Modal.Header closeButton className="d-flex ">
        <Modal.Title id="contained-modal-title-vcenter" as={Col}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};