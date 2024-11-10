import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faHospital, faVideo } from '@fortawesome/free-solid-svg-icons';
import './PoliceCctv.css';
import { TiArrowForward } from "react-icons/ti";
import PoliceNavbar from '../../Components/PoliceNavbar';
import { useNavigate } from 'react-router-dom';

const PoliceCctv = () => {
    const [patients, setPatients] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    // Fetch all patient data initially
    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/foundpatients');
            if (!response.ok) throw new Error('Failed to fetch patients');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    // const handleForwardClick = async (patientIndex) => {
    //     // Fetch patient details from the server based on the index
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/foundpatients/${patientIndex}`);
    //         if (!response.ok) throw new Error('Failed to fetch patient details');
    //         const patientDetails = await response.json();

    //         // Navigate to ViewNotification and pass the patient details
    //         navigate('/view-notification', { state: { patient: patientDetails } });

    //         // Show the notification message
    //         setShowNotification(true);
            
    //         // Hide the notification after 3 seconds
    //         setTimeout(() => {
    //             setShowNotification(false);
    //         }, 3000);
    //     } catch (error) {
    //         console.error("Error fetching patient details:", error);
    //     }
    // };


    const handleForward = async (patient) => {
        try {
            const response = await fetch('http://localhost:5000/found-patient-hospital', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    index : patient.index,
                    captured_date : patient.captured_date,
                    captured_time : patient.captured_time, 
                    cctv_id : patient.cctv_id,
                    location : patient.location, 
                    captured_image : patient.captured_image || [],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to forward missing patient');
            }

            const result = await response.json();
            alert(result.msg); // Display success message or handle accordingly
             // Navigate or update the UI as needed
        } catch (error) {
            console.error('Error forwarding missing patient:', error);
            alert('Failed to forward missing patient. Please try again later.');
        }
    };

    return (
        <div className="right-bar-2">
            <PoliceNavbar />
            <div className='polive-cctv-up'>
              <header className="header-2">
                <div className='police-up-text'>
                  <h1>Police Dashboard</h1>
                  <div className="police-hos-icon">
                    <div className='D-icons-3'>
                    <FontAwesomeIcon icon={faBell} className="icon-3   " />
                    </div>
                  </div>
                </div>
                
              </header>
            </div>
            
            <div className="content-2">
                <h2 className='h2-4'>PATIENT FOUND NOTIFICATION</h2>
                <hr className='hr-01' />
                <div className="icon-section">
                    <div className="icon-container" onClick={() => navigate('/policeViewnotification')}>
                        <FontAwesomeIcon icon={faHospital} className="icon" />
                        <span>Hospital</span>
                    </div>
                    <div className="icon-container" onClick={() => navigate('/police_cctv_dashboard')}>
                        <FontAwesomeIcon icon={faVideo} className="icon" />
                        <span>CCTV Unit</span>
                    </div>
                </div>
                <div className="notification-cards-2">
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <div key={patient.index} className="main-card">
                                <div className="card">
                                    <p><strong>Patient Index:</strong> {patient.index}</p>
                                    <p><strong>Date of Found:</strong> {patient.captured_date}</p>
                                    <p><strong>Time of Found:</strong> {patient.captured_time}</p>
                                    <p><strong>Location:</strong> {patient.location}</p>
                                </div>
                                <button onClick={() => handleForward(patient)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                    <TiArrowForward className='forward-btn' />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No patients found</p>
                    )}
                </div>
            </div>
            {showNotification && (
                <div className="notification-popup">
                    <p>Notification sent successfully</p>
                </div>
            )}
        </div>
    );
};

export default PoliceCctv;
