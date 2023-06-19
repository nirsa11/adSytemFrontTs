import React, { useState } from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
/**
 * A loader component that displays a spinner while content is being loaded.
 * @returns A React component that displays a spinner.
 */
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormGroup from 'react-bootstrap/FormGroup';
import CloseButton from 'react-bootstrap/CloseButton';
import Alert from 'react-bootstrap/Alert';
import './style/modal.css';

export const ModalUIComponent: React.FC<ModalProps> = ({ onHide, show, title, children }) => {
  return (
    <Modal onHide={onHide} show={show} centered className="col-12" style={{ zIndex: '1051' }}>
      <Modal.Header closeButton className="d-flex ">
        <Modal.Title id="contained-modal-title-vcenter" as={Col}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
