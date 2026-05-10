const Trip = require('../models/Trip');

// @desc    Get user trips
// @route   GET /api/trips
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user._id });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new trip
// @route   POST /api/trips
const createTrip = async (req, res) => {
    try {
        const { country, city, overview, startDate, endDate, status } = req.body;
        const trip = new Trip({
            user: req.user._id,
            country,
            city,
            overview,
            startDate,
            endDate,
            status
        });
        const createdTrip = await trip.save();
        res.status(201).json(createdTrip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTrips, createTrip };
