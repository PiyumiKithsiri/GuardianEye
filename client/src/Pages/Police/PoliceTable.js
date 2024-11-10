import React, { useState, useEffect } from 'react';
import './PoliceTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import PoliceNavbar from '../../Components/PoliceNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PoliceTable() {
  const [missingPatients, setMissingPatients] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch missing patients data from the API
  useEffect(() => {
    const fetchMissingPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/get-all-mark-patient-missing');
        setMissingPatients(response.data);
      } catch (err) {
        setError('Failed to fetch missing patients');
      }
    };

    fetchMissingPatients(); // Call the function to fetch missing patients
  }, []);

  return (
    <div className='police-main'>
    <div className="dashboard">
      <PoliceNavbar />
      <div className='police-up-main'>
      <div className='up-main'>
        <h1>Police Dashboard</h1>
        <div className="D-icons-up">
          <div className='police-icon-up'>
          <FontAwesomeIcon icon={faBell} className="icon-police" onClick={() => navigate("/policeViewnotification")} />
          </div>
        </div>
      </div>
      </div>

      <div className='middle-main'>
        <h2 className='h2-5'>Missing Patients</h2>
        <div className="table-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <table className="patients-table-poice">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Guardian Name</th>
                  <th>Date of Disappearance</th>
                  <th>Time of Disappearance</th>
                </tr>
              </thead>
              <tbody>
                {missingPatients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.index}</td>
                    <td>{patient.patientName}</td>
                    <td>{new Date(patient.dob).toLocaleDateString()}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.guardianName}</td>
                    <td>{new Date(patient.dateOfDisappearance).toLocaleDateString()}</td>
                    <td>{patient.timeOfDisappearance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default PoliceTable;
