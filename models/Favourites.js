const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
    audioRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'AudioRecord', required: true },
});

module.exports = mongoose.model('Favourites', favouritesSchema);