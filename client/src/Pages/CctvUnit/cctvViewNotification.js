import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './CctvViewNotification.css';
import CctvNavbar from '../../Components/CctvNavbar';
import { useNavigate } from 'react-router-dom';

const CctvViewNotification = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [missingPatients, setMissingPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMissingPatients();
    }, []);

    const fetchMissingPatients = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/get-all-cctv-patient-missing');
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
        <div className="view-right-bar">
            <CctvNavbar />
            <div className='cctc-view-up'>
              <header className="header-4">
                <div className='cctv-view-text-up'>
                 <h1>CCTV Surveillance Unit</h1>
                 <div className='D-icons-5'>
                    
                    <FontAwesomeIcon icon={faBell} className="icon-5" />
                 </div>
                </div>
                
              </header>
            </div>
            
            <div className='main-conte'>
                <div className="content">
                    <h2 className='h2-1'>MISSING PATIENTS NOTIFICATION</h2>
                    <hr className='hr-01' />
                </div>
                <div className='main-card'>
                    <div className="notification-cards">
                        {isLoading ? (
                            <p>Loading missing patients...</p>
                        ) : missingPatients.length === 0 ? (
                            <p>No missing patients available.</p>
                        ) : (
                            missingPatients.map((patient) => (
                                <div className="card-6" key={patient._id}>
                                    
                                    <p><strong>Patient ID:</strong> {patient.index}</p>
                                    <p><strong>Patient Name:</strong> {patient.patientName}</p>
                                    <p><strong>Date of Disappearance:</strong> {new Date(patient.dateOfDisappearance).toLocaleDateString()}</p>
                                    <p><strong>Time of Disappearance:</strong> {patient.timeOfDisappearance}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CctvViewNotification;
