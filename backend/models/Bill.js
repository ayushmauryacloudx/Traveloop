const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', billSchema);
