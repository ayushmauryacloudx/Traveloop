const Bill = require('../models/Bill');

// @desc    Get user bills
// @route   GET /api/billing
const getBills = async (req, res) => {
    try {
        const bills = await Bill.find({ user: req.user._id }).populate('tripId', 'country city');
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new bill
// @route   POST /api/billing
const createBill = async (req, res) => {
    try {
        const { tripId, amount, description, status } = req.body;
        const bill = new Bill({
            user: req.user._id,
            tripId,
            amount,
            description,
            status
        });
        const createdBill = await bill.save();
        res.status(201).json(createdBill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBills, createBill };
