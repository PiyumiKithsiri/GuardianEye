import React, { useState, useEffect } from 'react';
import './SendNotification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faBedPulse, faBed, faUpload } from '@fortawesome/free-solid-svg-icons';
import HsaNavbar from '../../Components/HsaNavbar';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Icons from '../../Components/Icons';

const SendNotification = () => {
  const navigate = useNavigate();
  const [patientIndex, setPatientIndex] = useState('');
  const [dateOfDisappearance, setDateOfDisappearance] = useState('');
  const [timeOfDisappearance, setTimeOfDisappearance] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [missingPatients, setMissingPatients] = useState([]);

  const fetchMissingPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/get-all-missing-patients');
      const data = await response.json();
      setMissingPatients(data);
    } catch (error) {
      console.error('Error fetching missing patients:', error);
    }
  };

  useEffect(() => {
    fetchMissingPatients();
  }, []);

  const handleSendNotification = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/mark-patient-missing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          index: patientIndex,
          dateOfDisappearance,
          timeOfDisappearance,
          imageUrls,
        }),
      });

      if (response.ok) {
        alert('Patient marked as missing');
        navigate('/missingpatients');
      } else {
        console.error('Failed to mark patient as missing');
      }
    } catch (error) {
      console.error('Error in marking patient missing:', error);
    }
  };

  const onDrop = async (acceptedFiles) => {
    const uploadedImageUrls = [];

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'missing_patient');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/diafasc7j/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        uploadedImageUrls.push(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    setImageUrls((prevUrls) => [...prevUrls, ...uploadedImageUrls]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  // Adjust drop area size based on the number of images
  const dropzoneStyle = {
    minHeight: '100px', 
    maxHeight: '300px', 
    overflowY: 'auto', 
    transition: 'height 0.3s ease-in-out',
    height: `${Math.min(100 + imageUrls.length * 50, 300)}px`, 
  };

  return (
    <div className='wrapper4'>
      <HsaNavbar />
      <div className='hospital-header'>
        <div className='send-noti-up'>
         <header className='header-0-12'>
          <div className='icon-send'>
           <h1>Send Notification</h1>
          <div className='D-icons-15'>
            <div className='send-new'>
            <Icons/>
            </div>
            
          </div>
          </div>
         
         </header>
        </div>
        

        <div className='content1'>
          <div className='icon-section1'>
            <div className='icon-container'onClick={() => navigate("/patients")}>
              <FontAwesomeIcon icon={faBedPulse} className='icon' />
              <span>Current Patients</span>
            </div>
            <div className='icon-container' onClick={() => navigate('/missingpatients')}>
              <FontAwesomeIcon icon={faBed} className='icon' />
              <span>Missing Patients</span>
            </div>
          </div>

          <form>
            <div className='form-group'>
              <label htmlFor='patient-id' className='send-label'>Patient ID <span>*</span></label>
              <input 
                type='number' 
                id='patient-id' 
                placeholder='Enter Patient ID'
                value={patientIndex}
                onChange={(e) => setPatientIndex(e.target.value)}
                required
              />
            </div>

            <div className='form-group-1'>
              <label htmlFor='date-disappearance' className='send-label'>Date of Disappearance</label>
              <input 
                type='date' 
                id='date-disappearance'
                value={dateOfDisappearance}
                onChange={(e) => setDateOfDisappearance(e.target.value)} 
              />
            </div>

            <div className='form-group-2'>
              <label htmlFor='time-disappearance' className='send-label'>Time of Disappearance</label>
              <input 
                type='time' 
                id='time-disappearance'
                value={timeOfDisappearance}
                onChange={(e) => setTimeOfDisappearance(e.target.value)} 
              />
            </div>
          </form>

         <div className='up-section-up'>
          <div className='upload-section'>
            <div 
              className={`dropzone ${imageUrls.length === 0 ? 'empty' : ''}`} 
              {...getRootProps()} 
              style={dropzoneStyle}
            >
              {imageUrls.length === 0 && (
                <>
                  <p><strong>Drag and drop or <span1>Browse</span1></strong></p>
                  <FontAwesomeIcon icon={faUpload} className='upload-icon' />
                </>
              )}
              {imageUrls.map((url, index) => (
                <img 
                className='upload-icon'
                  key={index} 
                  src={url} 
                  alt={`Uploaded ${index}`} 
                  style={{ maxWidth: '50px', maxHeight: '150px', margin: '5px' }} 
                />
              ))}
              <input {...getInputProps()} />
            </div>
          </div>
          </div>
        
         <div className='upload-btn-1'>
          <button className='missing-btn-1' onClick={handleSendNotification}>
            Send
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
