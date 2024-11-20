const Favourites = require('../models/favourites');
const AudioRecord = require('../models/audioRecord');

// Get all favourite audio records
exports.getFavourites = async (req, res) => {
    try {
        const favourites = await Favourites.find().populate('audioRecord');
        res.status(200).json({ favourites });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add to favourites
exports.addToFavourites = async (req, res) => {
    const { audioId } = req.body;

    try {
        const audioRecord = await AudioRecord.findById(audioId);
        if (!audioRecord) {
            return res.status(404).json({ message: 'Audio record not found' });
        }

        if (!audioRecord.favourite) {
            // Mark as favourite and save
            audioRecord.favourite = true;
            await audioRecord.save();

            // Add to Favourites collection
            const favourite = new Favourites({ audioRecord: audioRecord._id });
            await favourite.save();

            res.status(201).json({ message: 'Audio record added to favourites', favourite });
        } else {
            res.status(400).json({ message: 'Audio record is already in favourites' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove from favourites
exports.removeFromFavourites = async (req, res) => {
    const { audioId } = req.params;

    try {
        const favourite = await Favourites.findOne({ audioRecord: audioId });
        if (!favourite) {
            return res.status(404).json({ message: 'Audio record is not in favourites' });
        }

        // Remove from Favourites collection
        await Favourites.findByIdAndDelete(favourite._id);

        // Mark as not favourite in AudioRecord
        const audioRecord = await AudioRecord.findById(audioId);
        audioRecord.favourite = false;
        await audioRecord.save();

        res.status(200).json({ message: 'Audio record removed from favourites' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
