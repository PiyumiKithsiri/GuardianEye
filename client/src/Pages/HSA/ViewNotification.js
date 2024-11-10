import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faBedPulse, faBed } from '@fortawesome/free-solid-svg-icons';
import './ViewNotification.css';
import { useLocation } from 'react-router-dom';
import HsaNavbar from '../../Components/HsaNavbar';
import { useNavigate } from 'react-router-dom';
import Icons from '../../Components/Icons';

const ViewNotification = () => {
    const location = useLocation();
    const { patient } = location.state || { patient: null }; // Get patient data from the state
    const [isLoading, setIsLoading] = useState(true);
    const [missingPatients, setMissingPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMissingPatients();
    }, []);

    const fetchMissingPatients = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/get-all-found-patiet');
            if (!response.ok) {
                throw new Error('Failed to fetch missing patients');
            }
            const data = await response.json();
            console.log('Fetched Missing Patients:', data);
            setMissingPatients(data);
        } catch (error) {
            console.error('Error fetching missing patients:', error);
            alert('Failed to fetch missing patients. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="right-bar3">
            <HsaNavbar />
            <div className='hospital-header'>
                <header className="header-0-16">
                 <div className='view-up-icon'>
                    <h1>View Notification</h1>
                    <div className="D-icons-16">
                        <div className='view-new'>
                        <Icons/>
                        </div>
                        
                    </div>
                 </div>
                    
                </header>
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
                    </div>
                    <div className='h3-text'>
                        <h3>PATIENT FOUND NOTIFICATION</h3>
                        <hr className='hr-line'/>
                    </div>

                    <div className='main-box'>
                        <div className="notification-cards">
                            {isLoading ? (
                                <p>Loading missing patients...</p>
                            ) : missingPatients.length === 0 ? (
                                <p>No missing patients available.</p>
                            ) : (
                                missingPatients.map((patient) => (
                                    <div className="card-view" key={patient._id}>
                                        
                                        <p><strong>Patient Index:</strong> {patient.index}</p>
                                        <p><strong>Date Found:</strong> {patient.captured_date}</p>
                                        <p><strong>Time Found:</strong> {patient.captured_time}</p>
                                        <p><strong>Location:</strong> {patient.location}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewNotification;
