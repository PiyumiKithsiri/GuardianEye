// models/FoundPatient.js
const mongoose = require('mongoose');

// Define your FoundPatient schema
const foundPatientHositalSchema = new mongoose.Schema({
  index: Number,
  captured_date: String,
  captured_time: String,
  cctv_id: String,
  location: String,
});

// Export the model based on the schema
module.exports = mongoose.model('FoundPatientHospital', foundPatientHositalSchema);
