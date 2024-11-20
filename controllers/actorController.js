const Actor = require('../models/actorModel.js');
const { cloudinary } = require('../config/cloudinary');
const AudioRecord = require('../models/audioRecord');
// Create a new actor
exports.createActor = async (req, res) => {
    const { name, id } = req.body;
    try {
        const newActor = await Actor.create({
            name,
            id,
            image: req.file.path, // Cloudinary public URL
        });
        res.status(201).json(newActor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Get all actors
exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find().populate('audioRecords');
        res.json(actors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Delete an actor
exports.deleteActor = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await Actor.findById(id).populate('audioRecords');
        if (!actor) {
            return res.status(404).json({ error: "Actor not found" });
        }

        // Delete actor's image from Cloudinary
        if (actor.image) {
            const publicId = actor.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        }

        // Delete associated audio records
        for (const record of actor.audioRecords) {
            const publicId = record.audio.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
            await AudioRecord.findByIdAndDelete(record._id);
        }

        // Delete the actor
        await Actor.findByIdAndDelete(id);

        res.status(200).json({ message: "Actor and associated files deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search for actors by name
exports.searchActor = async (req, res) => {
    const { name } = req.query; // Get the search query from the request

    try {
        // Validate query
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Search query cannot be empty' });
        }

        // Find actors with a case-insensitive partial match
        const actors = await Actor.find({ name: { $regex: name, $options: 'i' } });

        if (actors.length === 0) {
            return res.status(404).json({ message: 'No actors found' });
        }

        res.status(200).json({ actors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
