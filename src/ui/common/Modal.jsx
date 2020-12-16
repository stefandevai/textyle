import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const Modal = ({ children, open, title, onClose }) => {
  return (
    <ReactModal
      isOpen={open}
      contentLabel={title}
      onRequestClose={onClose}
    >
      <h1>{title}</h1>

    </ReactModal>
  );
}

export default Modal;
