const Tour = require('../models/tourSchema');

const index = async (req, res, next) => {
    try {
        const tours = await Tour.find();
        res.send({tours, message: 'Successfully loaded tours', success: true});
    } catch (error) {
        res.status(500).send({error: error.message, message: 'Server side error', success: false});
    }
}

module.exports = { index }