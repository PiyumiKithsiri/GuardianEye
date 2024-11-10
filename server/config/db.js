const mongoose = require('mongoose');

const connectDB = async () => {
  const dbName = 'eyedb';
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  const fullUri = `${mongoUri}/${dbName}`; // Use backticks for template literals
  try {
    await mongoose.connect('mongodb://localhost:27017/eyedb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Optional, but good to have
      useFindAndModify: false // Optional, but good to have
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.log("end connection")
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;


