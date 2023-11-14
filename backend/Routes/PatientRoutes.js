const express = require('express');
const PatientController = require('./../Controllers/PatientController');
const { protect , restrictTo } = require('../Middlewares/authMiddlewares');


const router = express.Router();

//register
router.route('/register').post(PatientController.registerPatient);
//cart
router.route('/addToCart').post(protect,restrictTo('patient'),PatientController.addOverTheCounterMedicine);
router.route('/viewCart').get(protect,restrictTo('patient'),PatientController.viewCart);
router.route('/removeFromCart').put(protect,restrictTo('patient'),PatientController.removeItemFromCart);
router.route('/updateQuantity').put(protect,restrictTo('patient'),PatientController.updateQuantityOfItem);
//order
router.route('/checkout').post(protect,restrictTo('patient'),PatientController.Checkout);
router.route('/addAddress').post(protect,restrictTo('patient'),PatientController.addAddress);
router.route('/getAddresses').get(protect,restrictTo('patient'),PatientController.getAddresses);
// router.route('/removeAddress').delete(protect,restrictTo('patient'),PatientController.removeAddress);
router.route('/viewOrder/:orderId').get(protect,restrictTo('patient'),PatientController.viewOrder);
router.route('/cancelOrder/:orderId').put(protect,restrictTo('patient'),PatientController.cancelOrder);


module.exports = router;
