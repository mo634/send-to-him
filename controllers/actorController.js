const Actor = require('../models/actorModel.js');

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
