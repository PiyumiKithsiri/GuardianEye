import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import './viewnotification.css';

const ViewNotificationIcon = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="icon-container_cctv" onClick={() => navigate("/cctvviewnotification")}>
      <FontAwesomeIcon icon={faHospitalUser} className="icon6" />
      <span className="text-9">View Notification</span>
    </div>
  );
};

export default ViewNotificationIcon;
