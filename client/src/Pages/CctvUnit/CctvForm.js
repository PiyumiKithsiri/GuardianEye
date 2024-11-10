import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './CctvForm.css';
import CctvNavbar from '../../Components/CctvNavbar';
import { useNavigate } from 'react-router-dom';

const CctvForm = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    // Fetch initial patients data
    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/foundpatients');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();

        // WebSocket connection
        const ws = new WebSocket('ws://localhost:5000');
        ws.onmessage = (event) => {
            const newPatient = JSON.parse(event.data);
            setPatients((prev) => [...prev, newPatient]);
        };

        return () => ws.close();
    }, []);

    return (
        <div className="cctv-right-bar">
            <CctvNavbar />
            <div className='cc-form-up'>
             <header className="header-3">
                <div className='cc-form-text'>
                  <h1>CCTV Surveillance Unit</h1>
                 <div className='D-icons-1'>
                    
                    <FontAwesomeIcon icon={faBell} className="icon-1" onClick={() => navigate("/cctvviewnotification")}/>
                 </div>
                </div>
                
             </header>
            </div>
            
            <div className="table-container">
                <h2 className='h2-2'>Detected Patients</h2>
                <hr className='hr-01'/>
                <table className="notification-table">
                    <thead>
                        <tr className='table-th'>
                            <th>Patient ID</th>
                            <th>CCTV Number</th>
                            <th>Time of Detected</th>
                            <th>Date of Detected</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <tr key={patient.index}>
                                    <td>{patient.index}</td>
                                    <td>{patient.cctv_id}</td>
                                    <td>{patient.captured_time}</td>
                                    <td>{patient.captured_date}</td>
                                    <td>{patient.location}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No patients detected.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CctvForm;
