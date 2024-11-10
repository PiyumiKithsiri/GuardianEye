import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faGear, faGaugeSimple, faHospitalUser, faShareFromSquare, faComment, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import './HsaNavbar.css';

const HsaNavbar = () => {
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
                                <a href="#" onClick={() => navigate("/hsadashboard")}>
                                    <FontAwesomeIcon icon={faGaugeSimple} className="icon" />
                                    <span className="text nav-text" id="dash">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#" onClick={() => navigate("/patients")}>
                                    <FontAwesomeIcon icon={faHospitalUser} className="icon" />
                                    <span className="text nav-text" id="dash">Patients</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#" onClick={() => navigate("/sendnotification")}>
                                    <FontAwesomeIcon icon={faShareFromSquare} className="icon" />
                                    <span className="text nav-text" id="dash">Send Notification</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#" onClick={() => navigate("/viewnotification")}>
                                    <FontAwesomeIcon icon={faComment} className="icon" />
                                    <span className="text nav-text" id="dash">View Notification</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FontAwesomeIcon icon={faGear} className="icon" />
                                    <span className="text nav-text" id="dash">Settings</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href=""   onClick={() => navigate("/")} >
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

export default HsaNavbar;
