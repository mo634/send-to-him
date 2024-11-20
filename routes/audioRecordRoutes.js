const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { createAudioRecord, deleteAudioRecord, searchAudioRecord } = require('../controllers/audioRecordController');

const router = express.Router();
const upload = multer({ storage });

// Routes for Audio Records
router.post('/:actorId/create-audio', upload.single('audio'), createAudioRecord);

router.delete('/:actorId/delete-audio/:recordId', deleteAudioRecord); // Delete a specific audio record

router.get('/search', searchAudioRecord); // Route for searching audio records by name

module.exports = router;
