const mongoose = require('mongoose');

const missingpatientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  guardianName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  index: { type: Number, required: false },
  dateOfDisappearance: { type: Date, required: false }, 
  timeOfDisappearance: { type: String, required: false },
  imageUrls: [{ type: String, required: false }], // Array of image URLs
});

module.exports = mongoose.model('Missingpatient', missingpatientSchema);
