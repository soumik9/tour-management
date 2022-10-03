const express = require('express');
const router = express.Router();

// const User = require('../schema/userSchema');
const TourController = require('../controllers/tourController');

//get all roles
router.get('/tours', TourController.index);
router.post('/tours', TourController.create);



module.exports = router;