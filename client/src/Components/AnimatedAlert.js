import React from 'react';
import './AnimatedAlert.css';

const AnimatedAlert = ({ message, type, onClose }) => {
  return (
    <div className={`alert-container ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default AnimatedAlert;
