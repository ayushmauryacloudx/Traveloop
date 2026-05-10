const express = require('express');
const router = express.Router();
const { getTrips, createTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTrips).post(protect, createTrip);

module.exports = router;
