import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './AddPatientIcon.css';

const AddPatientIcon = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="icon-container_2" onClick={() => navigate("/Addpatients")}>
      <FontAwesomeIcon icon={faPlus} className="icon8" />
      <span className="text-11">Add Patients</span>
    </div>
  );
};

export default AddPatientIcon;
