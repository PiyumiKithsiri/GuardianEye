const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  guardianName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  index: { type: Number, required: false},
});


module.exports = mongoose.model('Patient', PatientSchema);