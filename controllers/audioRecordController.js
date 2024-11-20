const AudioRecord = require('../models/audioRecord.js');
const Actor = require('../models/actorModel.js');
const { cloudinary } = require('../config/cloudinary');

// Create a new audio record for an actor
exports.createAudioRecord = async (req, res) => {
    const { actorId } = req.params;
    const { name, rate } = req.body;

    try {
        const actor = await Actor.findById(actorId);
        if (!actor) {
            return res.status(404).json({ error: "Actor not found" });
        }

        const newAudioRecord = await AudioRecord.create({
            audio: req.file.path, // Cloudinary public URL
            name,
            rate,
            actor: actorId,
        });

        actor.audioRecords.push(newAudioRecord._id);
        await actor.save();

        res.status(201).json(newAudioRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



// Delete a specific audio record
exports.deleteAudioRecord = async (req, res) => {
    const { actorId, recordId } = req.params;

    try {
        const audioRecord = await AudioRecord.findById(recordId);
        if (!audioRecord) {
            return res.status(404).json({ error: "Audio record not found" });
        }

        // Delete audio file from Cloudinary
        const publicId = audioRecord.audio.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

        // Remove audio record reference from actor
        await Actor.findByIdAndUpdate(actorId, {
            $pull: { audioRecords: recordId }
        });

        // Delete the audio record
        await AudioRecord.findByIdAndDelete(recordId);

        res.status(200).json({ message: "Audio record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Search for audio records by name
exports.searchAudioRecord = async (req, res) => {
    const { name } = req.query; // Get the search query from the request

    try {
        // Validate query
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Search query cannot be empty' });
        }

        // Find audio records with a case-insensitive partial match
        const audioRecords = await AudioRecord.find({ name: { $regex: name, $options: 'i' } });

        if (audioRecords.length === 0) {
            return res.status(404).json({ message: 'No audio records found' });
        }

        res.status(200).json({ audioRecords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};