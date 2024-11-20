const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const favouritesRoutes = require('./routes/favouritesRoutes');

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
let isConnected = false; // Track database connection
async function connectToDatabase() {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

// Routes
const actorRoutes = require('./routes/actorRoutes');
const audioRecordRoutes = require('./routes/audioRecordRoutes');

app.use(async (req, res, next) => {
    await connectToDatabase(); // Ensure database connection on each request
    next();
});

app.use('/api/actors', actorRoutes);
app.use('/api/audio', audioRecordRoutes);
app.use('/api/favourites', favouritesRoutes);

// Export the app as a serverless function
module.exports.handler = serverless(app);
