const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { createActor, getAllActors } = require('../controllers/actorController');

const router = express.Router();
const upload = multer({ storage });

// Routes for Actors
router.post('/create-actor', upload.single('image'), createActor);
router.get('/get-actors', getAllActors);

module.exports = router;
