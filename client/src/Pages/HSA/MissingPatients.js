import React, { useState, useEffect } from 'react';
import './MissingPatients.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faPlus,faTrash,faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import HsaNavbar from '../../Components/HsaNavbar';
import axios from 'axios';
import Modal from '../../Components/Modal'; // Import the Modal component
import Icons from '../../Components/Icons';

const MissingPatients = () => {
  const navigate = useNavigate();
  const [missingPatients, setMissingPatients] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingPatientToDelete, setMissingPatientToDelete] = useState(null); // Store the patient ID to delete

  // Fetch missing patients data from the API
  useEffect(() => {
    const fetchMissingPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/get-all-mark-patient-missing');
        if (!response.ok) {
          throw new Error('Failed to fetch missing patients');
        }
        const data = await response.json();
        setMissingPatients(data); // Set the fetched missing patient data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMissingPatients(); // Call the function to fetch missing patients
  }, []);

  const handleDeleteClick = (patientId) => {
    setMissingPatientToDelete(patientId);
    setIsModalOpen(true); // Open the modal
  };

const handleDelete = async () => {
    if (missingPatientToDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/auth/delete-missingpatient/${missingPatientToDelete}`);
        
        if (response.status === 200) {
          setMissingPatients(missingPatients.filter(MissingPatient => MissingPatient._id !== missingPatientToDelete));
          setIsModalOpen(false); // Close the modal
        } else {
          setError('Failed to delete patient');
        }
      } catch (err) {
        console.error('Failed to delete patient', err);
        setError('Failed to delete patient');
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <HsaNavbar />
        <div className="container-mission">
          <div className="header">
            <div className="nav">
              <div className="search">
                <h1>Missing Patients</h1>
              </div>
              <div className='mission-icons-up'>
                <Icons/>
              </div>
             
            </div>
          </div>

          <div className="content-mission">
            <div className="miss-btn">
              <div className="cards">
                <a href="" onClick={() => navigate("/patients")}>
                  <div className="card1">
                    <div className="box">
                    
                      <p className="first-two" ><FontAwesomeIcon icon={faBedPulse} className="icon-dash" />Current Patients </p>
                    </div>
                  </div>
                </a>

                <a href="#">
                  <div className="card2">
                    <div className="box">
                      <p className="first-two"><FontAwesomeIcon icon={faBedPulse} className="icon-dash" />Missing Patients</p>
                    </div>
                  </div>
                </a>

               
              </div>
            </div>

            {/* Error handling */}
            {error ? (
              <div className="error-message">{error}</div>
            ) : (
              <table className="patients-table-miss ">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Guardian Name</th>
                    <th>Date of Disappearance</th>
                    <th>Time of Disappearance</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {missingPatients.map((MissingPatient) => (
                    <tr key={MissingPatient._id}>
                      <td>{MissingPatient.index}</td>
                      <td>{MissingPatient.patientName}</td>
                      <td>{new Date(MissingPatient.dob).toLocaleDateString()}</td>
                      <td>{MissingPatient.gender}</td>
                      <td>{MissingPatient.guardianName}</td>
                      <td>{new Date(MissingPatient.dateOfDisappearance).toLocaleDateString()}</td>
                      <td>{MissingPatient.timeOfDisappearance}</td>
                      <td>
                      <FontAwesomeIcon icon={faTrash} className="icon-trash" onClick={() => handleDeleteClick(MissingPatient._id)} />{}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleDelete} 
        />
      </div>
    </>
  );
};

export default MissingPatients;
