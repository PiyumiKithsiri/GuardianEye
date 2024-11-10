import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './TrainModel.css';
import CctvNavbar from '../../Components/CctvNavbar';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import SearchIcon from '../../Components/searchpatients';
import FoundIcon from '../../Components/foundpatients';
import ViewNotificationIcon from '../../Components/viewnotification';
import { useNavigate } from 'react-router-dom';

const TrainModel = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearchPatient = async () => {
        setLoading(true); // Start loading animation
        try {
            const response = await axios.post('http://127.0.0.1:5000/run-recognition');
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert('Error: ' + error.response.data.message);
            } else {
                alert('Error: Unable to reach the server or a network issue occurred.');
            }
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <div className="train-right-bar1">
            <CctvNavbar />
            <div className='train-up-bar'>
              <header className="header-9">
                <h1>CCTV Surveillance Unit</h1>
                <div className="D-icons">
                   <div className='train-up-icons'>
                    <FontAwesomeIcon icon={faBell} className="icon-train"  onClick={() => navigate("/cctvviewnotification")} />
                    </div>
                </div>
              </header>
            </div>

            <div className='train-all'>
            <div className='dev-in-cctv'>
                
                <FoundIcon/>
                <ViewNotificationIcon/>
            </div>
            

            <div className="train">

                <div className='train-btn'>
                <button className='train-model' onClick={handleSearchPatient} disabled={loading}>
                    {loading ? 'Searching...' : 'Search Patient'}
                </button><br />
                </div>
                <div className='train-cansel'>
                <button className='cancel' disabled={loading}>Cancel</button>
                </div>
            </div>
            </div>

            {/* Loading overlay */}
            {loading && (
                <div className="loading-overlay">
                    <TailSpin height="100" width="100" color="white" ariaLabel="tail-spin-loading" />
                </div>
            )}
        </div>
    );
};

export default TrainModel;
