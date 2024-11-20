const mongoose = require('mongoose');

const audioRecordSchema = new mongoose.Schema({
    audio: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 5, // Assuming a 5-star rating system
    },
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: true,
    },
    favourite: { type: Boolean, default: false },
});

module.exports = mongoose.model('AudioRecord', audioRecordSchema);
