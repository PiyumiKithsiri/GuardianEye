import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import './foundpatients.css';

const FoundIcon = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="icon-container_1" onClick={() => navigate("/cctv_dashboard")}>
      <FontAwesomeIcon icon={faHospitalUser} className="icon6" />
      <span className="text-9"> Found Patients</span>
    </div>
  );
};

export default FoundIcon;
