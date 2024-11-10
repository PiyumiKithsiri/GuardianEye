import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faHospital, faVideo } from '@fortawesome/free-solid-svg-icons';
import './PoliceHospital.css';
import { TiArrowForward } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import PoliceNavbar from '../../Components/PoliceNavbar';

const PoliceHospital = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [missingPatients, setMissingPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMissingPatients();
    }, []);

    const fetchMissingPatients = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/get-all-mark-patient-missing');
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

    const handleForward = async (patient) => {
        try {
            const response = await fetch('http://localhost:5000/forward-patient-missing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientName: patient.patientName,
                    dob: patient.dob, // Ensure this is available in your data
                    gender: patient.gender, // Ensure this is available in your data
                    guardianName: patient.guardianName,
                    phoneNumber: patient.phoneNumber, // Ensure this is available in your data
                    address: patient.address,
                    index: patient.index,
                    dateOfDisappearance: patient.dateOfDisappearance,
                    timeOfDisappearance: patient.timeOfDisappearance,
                    imageUrls: patient.imageUrls || [], // Use an empty array if no images
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
        <div  className='police-hospital'>
        <div className="right-bar-3">
            <PoliceNavbar />
            <div className='police-hos'>
            <header className="header-2">
                <div className='police-up-text'>
                 <h1>Police Dashboard</h1>
                 <div className='police-hos-icon'>
                 <div className="D-icons-3">
                    
                    <FontAwesomeIcon icon={faBell} className="icon-3"  onClick={() => navigate("/policeViewnotification")}/>
                 </div>
                 </div>
                </div>
                
            </header>
            </div>
            
            <div className="content-2">
                <h2 className='h2-4'>Missing Patients</h2><hr className='hr-01'/>
                
                <div className="icon-section">
                    <div className="icon-container" onClick={() => navigate("/policeViewnotification")}>
                        <FontAwesomeIcon icon={faHospital} className="icon" />
                        <span>Hospital</span>
                    </div>
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faVideo} className="icon" />
                        <span onClick={() => navigate("/police_cctv_dashboard")}>CCTV Unit</span>
                    </div>
                </div>
                <div className="notification-cards-2">
                    {isLoading ? (
                        <p className="loading">Loading missing patients...</p>
                    ) : missingPatients.length === 0 ? (
                        <p className="no-notifications">No missing patients available.</p>
                    ) : (
                        missingPatients.map((patient) => (
                            <div className="main-card" key={patient._id}>
                                <div className="card-police">
                                    
                                    <p><strong>Patient ID:</strong> {patient.index}</p>
                                    <p><strong>Patient Name:</strong> {patient.patientName}</p>
                                    <p><strong>Date of Disappearance:</strong> {new Date(patient.dateOfDisappearance).toLocaleDateString()}</p>
                                    <p><strong>Time of Disappearance:</strong> {patient.timeOfDisappearance}</p>
                                </div>
                                <TiArrowForward className='forward-btn' onClick={() => handleForward(patient)} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default PoliceHospital;
