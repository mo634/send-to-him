const express = require('express');
const { getFavourites, addToFavourites, removeFromFavourites } = require('../controllers/favouritesController');

const router = express.Router();

// Routes for Favourites
router.get('/get-favourites', getFavourites); // Get all favourite audio records
router.post('/create-favourite', addToFavourites); // Add an audio record to favourites
router.delete('/:audioId', removeFromFavourites); // Remove an audio record from favourites

module.exports = router;
