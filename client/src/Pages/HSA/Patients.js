import React, { useState, useEffect } from 'react';
import './Patients.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faPlus, faBedPulse, faBed, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import HsaNavbar from '../../Components/HsaNavbar';
import axios from 'axios';
import Icons from '../../Components/Icons';
import Modal from '../../Components/Modal'; 

const Patients = () => {
  const navigate = useNavigate();
  const [patientsData, setPatientsData] = useState([]);
  const [error, setError] = useState(null); // To handle potential errors
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null); // Store the patient ID to delete

  // Fetch patient data from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/get-all-patients');
        setPatientsData(response.data); // Set the patient data to the state
      } catch (err) {
        setError('Failed to fetch patients');
        console.error(err);
      }
    };

    fetchPatients(); // Call the function to fetch patients
  }, []);

 const handleDeleteClick = (patientId) => {
    setPatientToDelete(patientId);
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async () => {
    if (patientToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/delete-patient/${patientToDelete}`);
        setPatientsData(patientsData.filter(patient => patient._id !== patientToDelete));
        setIsModalOpen(false); // Close the modal
      } catch (err) {
        console.error('Failed to delete patient', err);
        setError('Failed to delete patient');
      }
    }
  };


  return (
    <>
      <div className='wrapper5'>
        <HsaNavbar />

        <div className='hospital-header'>
          <div className='hospital-header-text-up'>
          <header className="header-0-11">
            <div className='pa-h1'>
            <h1>Patients</h1>
            </div>
            
            <div className='patients-icon-up'>
            <Icons/>
            </div>
          </header>
          </div>

          <div className="content1">
            <div className="icon-section1">
              <div className="icon-container" onClick={() => navigate("/patients")}>
                <FontAwesomeIcon icon={faBedPulse} className="icon" />
                <span>Current Patients</span>
              </div>
              <div className="icon-container" onClick={() => navigate("/missingpatients")}>
                <FontAwesomeIcon icon={faBed} className="icon" />
                <span>Missing Patients</span>
              </div>
              <div className="icon-container4" onClick={() => navigate("/addpatients")}>
                <FontAwesomeIcon icon={faPlus} className="icon4" />
              </div>
            </div>

            {/* Handle the case if there is an error */}
            {error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div className='pati-table'>
              <table className="patients-table">
                <thead>
                  <tr className='table-th'>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>DoB</th>
                    <th>Gender</th>
                    <th>Guardian Name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loop through patientsData and display the patients */}
                  {patientsData.map((patient) => (
                    <tr key={patient._id}>
                      <td>{patient.index}</td>
                      <td>{patient.patientName}</td>
                      <td>{patient.address}</td>
                      <td>{patient.dob}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.guardianName}</td>
                      <td>
                        <FontAwesomeIcon icon={faTrash} className="icon-trash" onClick={() => handleDeleteClick(patient._id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
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

export default Patients;
