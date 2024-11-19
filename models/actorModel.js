const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        unique: true,
        required: true,
    },
    audioRecords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AudioRecord',
    }],
});

module.exports = mongoose.model('Actor', actorSchema);
