
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['HSA', 'Police', 'CCTVUnit'] } // Add role field
});

module.exports = mongoose.model('Users', UserSchema);