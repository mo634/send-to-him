const AudioRecord = require('../models/audioRecord.js');
const Actor = require('../models/actorModel.js');

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
