const Tour = require('../models/tourSchema');

const index = async (req, res) => {
    try {
        const tours = await Tour.find();
        const total = await Tour.countDocuments();
        res.send({ total, message: 'Successfully loaded tours', success: true, tours });
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Server side error', success: false });
    }
}

const create = async (req, res) => {
    try {
        const tour = new Tour(req.body);
        await tour.save();
        res.send({ tour, message: 'Tour created successfully', success: true });

    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Failed to create tour', success: false });
    }
}

module.exports = { index, create }