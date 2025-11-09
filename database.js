const mongoose = require('mongoose');

// Use environment variable for MongoDB URI, fallback to default
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/L1F23BSSE0073';

// Connect to MongoDB
mongoose.connect(mongoURI);

const database = mongoose.connection;

// MongoDB connection event handlers
database.on('connected', () => {
    console.log('✅ MongoDB Connected');
});

database.on('error', (err) => {
    console.log('❌ MongoDB connection error:', err.message);
});

database.on('disconnected', () => {
    console.log('⚠️ MongoDB is disconnected');
});

module.exports = database;