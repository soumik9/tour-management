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

const single = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findOne({ _id: id });

        res.send({ message: 'Successfully loaded tours', success: true, tour });
    } catch (error) {
        res.status(500).send({ error: error.message, message: 'Server side error', success: false });
    }
}

const cheapest = async (req, res) => {
    try {
        const cheapestTours = await Tour.find().sort('price').limit(3);
        res.send({ message: 'Successfully loaded tours', success: true, cheapestTours });
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

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const verifyTour = await Tour.findOne({ _id: id });
    
        if (verifyTour) {
          const updatedData = await Tour.findOneAndUpdate({ _id: id }, { $set: req.body }, {
            runValidators: true
          });
    
          res.json({ message: "Tour successfully updated", success: true });
        }else{
          return res.status(404).send({ message: "Tour not found", success: false });
        }
      } catch (error) {
        res.status(500).send({ error: error.message, message: 'Failed to update tour', success: false });
      }
}

module.exports = { index, single, cheapest, create, update }