import React from 'react';
import './Modal.css'; // Ensure this path is correct

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Do you want to delete this patient?</p>
        <button className="confirm" onClick={onConfirm}>Yes</button>
        <button className="cancel" onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default Modal;