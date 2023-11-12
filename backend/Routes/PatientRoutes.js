const express = require('express');
const PatientController = require('./../Controllers/PatientController');

const router = express.Router();

router.route('/register').post(PatientController.registerPatient);
router.route('/addToCart').post(PatientController.addOverTheCounterMedicine);
router.route('/viewCart').get(PatientController.viewCart);
router.route('/removeFromCart').put(PatientController.removeItemFromCart);
router.route('/updateQuantity').put(PatientController.updateQuantityOfItem);

module.exports = router;
