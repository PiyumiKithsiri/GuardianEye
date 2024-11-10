import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faBed } from '@fortawesome/free-solid-svg-icons';
import HsaNavbar from '../../Components/HsaNavbar';
import PieChartComponent from '../../Components/PieChartComponent';
import Icons from '../../Components/Icons';
import PatientIcon from '../../Components/PatientIcon';
import AddPatientIcon from '../../Components/AddPatientIcon';
import SendNotificationIcon from '../../Components/SendNotificationIcon';
import ViewNotificationIcon from '../../Components/ViewNotificationIcon';

const Dashboard2 = () => {
  const [patientsData, setPatientsData] = useState(0);
  const [MissingpatientsData, setMissingpatientsData] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/get-all-patients-count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        return response.json();
      })
      .then(data => {
        setPatientsData(data.count);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/get-all-Missingpatients-count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        return response.json();
      })
      .then(data => {
        setMissingpatientsData(data.count);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);


  
  return (
    <div className="wrapper4">
      <HsaNavbar />
      <div className="hospital-header">
        <header className="header">
          <div className='da-h1'>
          <h1>Dashboard</h1>
          </div>
          
          <div className='da-up'>
          <Icons className="dashboard-icon"/>
          </div>
         
        </header>
      </div>
      
      <div className="icon-section7">
        {/* Total Patients container with custom gradient and navigation */}
        <div
          className="icon-container0"
          style={{ background: 'linear-gradient(30deg, #0e522fb3 0%, #09c18198 100%)' }}
        >
          <FontAwesomeIcon icon={faPeopleGroup} className="icon7" />
          <span className="text-10-1">{patientsData}</span>
          <span className="text-10">Total Patients </span>
        </div>
        
        {/* Missing Patients container with red gradient background */}
        <div
          className="icon-container0"
          style={{ background: 'linear-gradient(30deg, #52240eb3 0%, #c1090998 100%)' }}
        >
          <FontAwesomeIcon icon={faBed} className="icon7" />
          <span className="text-10-1">{MissingpatientsData}</span>
          <span className="text-10">Missing Patients</span>
        </div>
        
        <div className='pat-icon'><PatientIcon /></div>
        <div className='add-icon'><AddPatientIcon /></div>
        <SendNotificationIcon />
        <div className='view-dash'><ViewNotificationIcon /></div>
      </div>

      {/* Render Pie Chart Component */}
      <div className='pie-chart-dash'><PieChartComponent /></div>

      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default Dashboard2;
