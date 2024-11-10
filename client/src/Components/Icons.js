import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Icons.css';

const Icons = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="D-icons">
      <FontAwesomeIcon
        icon={faEnvelope}
        className="icons1"
        onClick={() => navigate("/SendNotification")}
      />
      <FontAwesomeIcon
        icon={faBell}
        className="icons2"
        onClick={() => navigate("/ViewNotification")}
      />
    </div>
  );
};

export default Icons;
