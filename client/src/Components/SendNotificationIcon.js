import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import './SendNotificationIcon.css';

const SendNotificationIcon = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="icon-container_3" onClick={() => navigate("/SendNotification")}>
      <FontAwesomeIcon icon={faShareFromSquare} className="icon9" />
      <span className="text-12">Send Notification</span>
    </div>
  );
};

export default SendNotificationIcon;
