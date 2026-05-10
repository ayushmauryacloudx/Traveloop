const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    country: { type: String, required: true },
    city: { type: String, required: true },
    overview: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: { type: String, enum: ['Ongoing', 'Upcoming', 'Completed'], default: 'Upcoming' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);
