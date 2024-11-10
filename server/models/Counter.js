const mongoose = require('mongoose');

// Schema for tracking the index
const counterSchema = new mongoose.Schema({
  entity: { type: String, required: true, unique: true },  // Entity like 'patient'
  index: { type: Number, default: 0 },  // Highest index for that entity
});

// Export the Counter model
module.exports = mongoose.model('Counter', counterSchema);
