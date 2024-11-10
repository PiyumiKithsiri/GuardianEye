import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import './searchpatients.css';

const SearchIcon = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="icon-container_1" onClick={() => navigate("/patients")}>
      <FontAwesomeIcon icon={faHospitalUser} className="icon6" />
      <span className="text-9">Patients</span>
    </div>
  );
};

export default SearchIcon;
