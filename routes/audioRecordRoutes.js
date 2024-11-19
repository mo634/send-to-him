const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { createAudioRecord } = require('../controllers/audioRecordController');

const router = express.Router();
const upload = multer({ storage });

// Routes for Audio Records
router.post('/:actorId/create-audio', upload.single('audio'), createAudioRecord);

module.exports = router;
