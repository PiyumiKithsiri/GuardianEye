import React, { useState } from 'react';
import './AddPatients.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faBedPulse, faBed } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import HsaNavbar from '../../Components/HsaNavbar';
import Icons from '../../Components/Icons';

const AddPatients = () => {
  const navigate = useNavigate();

  // State variables for form data
  const [patientName, setPatientName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [photoStatus, setPhotoStatus] = useState(null); // New state for photo status
  
// Validation function with alert messages
const validateForm = () => {
  if (!patientName) {
    alert("Patient name is required!");
    return false;
  }
  if (!dob) {
    alert("Date of birth is required!");
    return false;
  }
  if (!gender) {
    alert("Please select a gender!");
    return false;
  }
  if (!guardianName) {
    alert("Guardian name is required!");
    return false;
  }
  if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
    alert("Phone number must be 10 digits!");
    return false;
  }
  if (!address) {
    alert("Address is required!");
    return false;
  }
  return true;
};

 // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const patientData = {
    patientName,
    dob,
    gender,
    guardianName,
    phoneNumber,
    address,
  };

    try {
      const response = await fetch('http://localhost:5000/api/auth/add-patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.msg);
        alert('Patient added successfully');
        navigate('/patients'); // Navigate to the patients page after successful submission
      } else {
        const result = await response.json();
        setError(result.msg);
      }
    } catch (err) {
      console.error(err.message);
      setError('An error occurred. Please try again.');
    }
  };

  // New function to handle "Take Photo" button click
  const handleTakePhoto = async () => {
    try {
      setPhotoStatus('Taking photo...');
      const response = await fetch('http://localhost:5000/api/auth/take-photo', {
        method: 'POST',
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.msg);
        setPhotoStatus(result.msg);
        alert('Photo taken successfully');
      } else {
        const result = await response.json();
        setPhotoStatus(result.msg);
      }
    } catch (err) {
      console.error(err.message);
      setPhotoStatus('An error occurred while taking photo.');
    }
  };

  return (
    <div className='wrapper7'>
      <HsaNavbar />

      <div className='hospital-header'>
        <header className="header-0-12">
          <div className='add-up-header'>
          <h1>Add Patients</h1>
           <div className="D-icons-15">
            <div className='add-icon-up'>
              <div className='patients-icon'>
              <Icons/>
              </div>
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

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit} className='add-form'>
            <div className='add-from-2'>
            <div className="form-group">
              <label htmlFor="patient-name" className='name-section'>Patient Name <span>*</span></label>
              <input
                type="text"
                id="patient-name"
                placeholder="Enter Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob" className='name-section'>Date of Birth <span>*</span></label>
              <input
              className='dob-input'
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender" className='name-section'>Gender <span>*</span></label>
              <select
              className='gender-select'
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="guardian-name" className='name-section'>Guardian Name <span>*</span></label>
              <input
                type="text"
                className='guardian-input'
                id="guardian-name"
                placeholder="Enter Guardian Name"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone-number" className='name-section'>Guardian Phone Number <span>*</span></label>
              <input
                type="number"
                id="phone-number"
                placeholder="Enter Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className='name-section'>Guardian Address <span>*</span></label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='under-btn'>
          <button type="submit" className="green-button" onClick={handleTakePhoto}>Capture & Submit</button>
          <button className='missing-btn' onClick={() => navigate("/patients")}>Cancel</button>
          </div>
          </div>
          </form>
          
       
        </div>
      </div>
    </div>
  );
};

export default AddPatients;
