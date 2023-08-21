import React from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Success Modal"
    >
      <h2>Registration Successful!</h2>
      <p>Your registration was successful. Welcome!</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default SuccessModal;
