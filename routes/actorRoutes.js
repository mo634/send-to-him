const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { createActor, getAllActors, deleteActor, searchActor } = require('../controllers/actorController');

const router = express.Router();
const upload = multer({ storage });

// Routes for Actors
router.post('/create-actor', upload.single('image'), createActor);
router.get('/get-actors', getAllActors);
router.delete('/delete-actor/:id', deleteActor); // Delete an actor by ID
router.get('/search', searchActor); // Route for searching actors by name

module.exports = router;
