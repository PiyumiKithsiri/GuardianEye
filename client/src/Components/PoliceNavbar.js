import React, { useState } from 'react';
import './PoliceNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faBed, faCommentSms, faGear, faBell, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

const PoliceNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`wrapper ${isSidebarOpen ? 'open' : ''}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
            </button>
            <nav className={`sidebar ${isSidebarOpen ? 'responsive_nav' : ''}`}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={logo} className="img" alt="logo" />
                        </span>

                        <div className="sidebar-input">
                            <div className="sidebar-input-text">
                                <input type="search" placeholder="Search..." className="search" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <p className="main-p">MENU</p>
                        <ul className="menu-links">
                            <li className="nav-link">
                                <a href="#" onClick={() => navigate("/police_dashboard")}>
                                    <FontAwesomeIcon icon={faBed} className="icon" />
                                    <span className="text nav-text" id="dash">Missing Patients</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#" onClick={() => navigate("/policeViewnotification")}>
                                    <FontAwesomeIcon icon={faBell} className="icon" />
                                    <span className="text nav-text" id="dash">View Notification</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FontAwesomeIcon icon={faGear} className="icon" />
                                    <span className="text nav-text" id="dash">Setting</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href=""   onClick={() => navigate("/")}>
                                <FontAwesomeIcon icon={faSignOutAlt} className='icon' />
                                    <span className="text nav-text" id="dash">Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default PoliceNavbar;
