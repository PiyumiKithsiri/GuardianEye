import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import './ViewNotificationIcon.css';

const ViewNotificationIcon = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="icon-container_4" onClick={() => navigate("/ViewNotification")}>
      <FontAwesomeIcon icon={faComment} className="icon10" />
      <span className="text-13">View Notification</span>
    </div>
  );
};

export default ViewNotificationIcon;
