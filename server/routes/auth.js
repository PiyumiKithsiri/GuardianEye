const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Patient = require('../models/Patient');
const MissingPatient = require('../models/missingpatient');
const Counter = require('../models/Counter'); 
const FoundPatient = require('../models/FoundPatient');
const CctvMissing = require('../models/CctvMissing');
const FoundPatientHospital = require('../models/FoundPatientHospital');


//take photo
const { exec } = require('child_process');
const path = require('path');

const router = express.Router();


// DELETE route to delete a patient by ID
router.delete('/delete-patient/:id', async (req, res) => {
  console.log("Attempting to delete patient");
  try {
    const patientId = req.params.id;
    console.log("Attempting to delete patient with index:", patientId);

    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    console.error('Error deleting patient:', err); // Add this line for logging
    res.status(500).json({ message: 'Failed to delete patient', error: err.message });
  }
});

// Delete missing patient by ID
router.delete('/api/auth/delete-missingpatient/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await MissingPatient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting patient', error: err.message });
  }
});



// Route to get all found patients
router.get('/api/foundpatients', async (req, res) => {
  try {
    const patients = await FoundPatient.find();

    // Map through each patient to convert binary image data to Base64 format
    const formattedPatients = patients.map(patient => ({
      ...patient._doc,
      captured_image: patient.captured_image ? patient.captured_image.toString('base64') : null
    }));

    res.json(formattedPatients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
});

// Get all found patients
router.get('/foundpatients', async (req, res) => {
  try {
      const patients = await FoundPatient.find({});
      res.status(200).json(patients);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Add a new found patient and broadcast to WebSocket clients
router.post('/foundpatients', async (req, res) => {
  try {
      const newPatient = await FoundPatient.create(req.body);
      req.wssBroadcast(newPatient); // Broadcast new patient data via WebSocket
      res.status(201).json(newPatient);
  } catch (error) {
      res.status(500).json({ error: 'Failed to add patient' });
  }
});


// Route to get a specific patient by index
router.get('/api/foundpatients/:index', async (req, res) => {
  try {
      const patientIndex = req.params.index;
      const patient = await FoundPatient.findOne({ index: patientIndex });
      if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
      }
      res.json(patient);
  } catch (error) {
      res.status(500).json({ message: "Error fetching patient details" });
  }
});


// User registration
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body; // Add role to the destructured fields

  try {
    let user = await User.findOne({ email });
    if (user) { 
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password, role }); // Store the role

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Respond without a token
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Send success message if credentials are correct without a token
    res.status(200).json({ msg: 'Login successful', role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Add patient with index increment

router.post('/add-patient', async (req, res) => {
  const { patientName, dob, gender, guardianName, phoneNumber, address } = req.body;

  try {
    // Step 1: Find the counter for the 'patient' entity
    let counter = await Counter.findOne({ entity: 'patient' });

    // Step 2: If no counter exists for 'patient', create one
    if (!counter) {
      counter = new Counter({ entity: 'patient', index: 0 });
      await counter.save();
    }

    // Step 3: Increment the index for the new patient
    const newIndex = counter.index + 1;

    // Step 4: Update the counter's index in the database
    counter.index = newIndex;
    await counter.save();

    // Step 5: Create a new patient with the incremented index
    const patient = new Patient({
      patientName,
      dob,
      gender,
      guardianName,
      phoneNumber,
      address,
      index: newIndex,  // Set the new index here
    });

    // Step 6: Save the new patient to the database
    await patient.save();
    res.status(201).json({ msg: 'Patient added successfully', index: newIndex });

  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ msg: 'Patient with this dob already exists' });
    } else {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
});


router.post('/add-patient-count', async (req, res) => {
  const { patientName, dob, gender, guardianName, phoneNumber, address } = req.body;

  try {
    // Step 1: Find the counter for the 'patient' entity
    let counter = await Counter.findOne({ entity: 'patient' });

    // Step 2: If no counter exists for 'patient', create one
    if (!counter) {
      counter = new Counter({ entity: 'patient', index: 0 });
      await counter.save();
    }

    // Step 3: Increment the index for the new patient
    const newIndex = counter.index + 1;

    // Step 4: Update the counter's index in the database
    counter.index = newIndex;
    await counter.save();

    // Step 5: Create a new patient with the incremented index
    const patient = new Patient({
      patientName,
      dob,
      gender,
      guardianName,
      phoneNumber,
      address,
      index: newIndex,  // Set the new index here
    });



    // Step 6: Save the new patient to the database
    await patient.save();

    // Step 7: Send success response with the new patient's index
    res.status(201).json({ msg: 'Patient added successfully', index: newIndex });
  } catch (err) {
    // Handle errors
    if (err.code === 11000) {
      res.status(400).json({ msg: 'Patient with this dob already exists' });
    } else {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
});



router.get('/get-all-patients', (req, res) => {
  Patient.find()  // Use the correct model name here
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/get-all-patients-count', (req, res) => {
  Patient.countDocuments()  // Mongoose method to count documents
    .then(count => res.json({ count }))  // Send back the count as JSON
    .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/get-all-Missingpatients-count', (req, res) => {
  MissingPatient.countDocuments()  // Mongoose method to count documents
    .then(count => res.json({ count }))  // Send back the count as JSON
    .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/get-all-mark-patient-missing', (req, res) => {

  // Fetch all missing patients
  MissingPatient.find()
    .then(missingpatients => res.json(missingpatients))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Mark a patient as missing by index
router.post('/mark-patient-missing', async (req, res) => {
  const { index, dateOfDisappearance, timeOfDisappearance, imageUrls } = req.body; // imageUrls is now an array

  try {
    // Find the patient by index
    const patient = await Patient.findOne({ index });

    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    // Create a new MissingPatient record
    const missingPatient = new MissingPatient({
      patientName: patient.patientName,
      dob: patient.dob,
      gender: patient.gender,
      guardianName: patient.guardianName,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
      dateOfDisappearance,
      timeOfDisappearance,
      index: patient.index,
      imageUrls, // Save the array of image URLs to the database
    });

    await missingPatient.save();

    res.status(201).json({ msg: 'Patient marked as missing successfully', missingPatient });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// New Route to Trigger Python Script
// =======================
router.post('/take-photo', async (req, res) => {
  try {
    // Define the path to your 
    const scriptPath = path.join(__dirname, '../python/capture.py'); // Adjust as needed

    // Execute the Python script
    exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).json({ msg: 'Failed to take photo', error: error.message });
      }

      if (stderr) {
        console.error(`Python script stderr: ${stderr}`);
        return res.status(500).json({ msg: 'Error in photo capture process', error: stderr });
      }

      console.log(`Python script output: ${stdout}`);
      res.status(200).json({ msg: 'Photo captured successfully', output: stdout });
    });
  } catch (err) {
    console.error(`Server error: ${err.message}`);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});






router.post('/forward-patient-missing', async (req, res) => {
  const { patientName, dob, gender, guardianName, phoneNumber, address, index, dateOfDisappearance, timeOfDisappearance, imageUrls } = req.body; // imageUrls is now an array

  try {
    // Find the patient by index
   

    // Create a new MissingPatient record
    const cctvMissingPatient = new CctvMissing({
      patientName,
      dob,
      gender,
      guardianName,
      phoneNumber,
      address,
      dateOfDisappearance,
      timeOfDisappearance,
      index,
      imageUrls, // Save the array of image URLs to the database
    });

    await cctvMissingPatient.save();

    res.status(201).json({ msg: 'Patient marked as missing successfully', cctvMissingPatient });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/get-all-cctv-patient-missing', (req, res) => {
  CctvMissing.find()
    .then(CctvMissing => res.json(CctvMissing))
    .catch(err => res.status(400).json({ error: err.message }));
});


router.post('/found-patient-hospital', async (req, res) => {
  const { index, captured_date, captured_time, cctv_id, location, captured_image} = req.body; // imageUrls is now an array

  try {
    const FoundPatient = new FoundPatientHospital({
      index,
      captured_date,
      captured_time,
      cctv_id,
      location,
      captured_image,
    });

    await FoundPatient.save();

    res.status(201).json({ msg: 'Patient marked as missing successfully', FoundPatient });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/get-all-found-patiet', (req, res) => {
  FoundPatientHospital.find()
    .then(FoundPatientHospital => res.json(FoundPatientHospital))
    .catch(err => res.status(400).json({ error: err.message }));
});


module.exports = router;
