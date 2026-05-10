const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    type: { type: String, required: true },
    trip: { type: String, default: 'General' },
    mood: { type: String, default: '😊' },
    date: { type: String },
    time: { type: String },
    pinned: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
