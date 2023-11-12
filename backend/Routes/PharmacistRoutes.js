const express = require('express');
const PharmacistController = require('../Controllers/PharmacistController');
const { protect , restrictTo } = require('../Middlewares/authMiddlewares');


const router = express.Router();
router.route('/register').post(PharmacistController.register);
router.route('/quantities').get(protect,restrictTo('pharmacist'),PharmacistController.getMedicineQuantitySales);
router.route('/addMedicine').post(protect,restrictTo('pharmacist'),PharmacistController.addMedicine);
router.route('/editMedicine/:id').patch(protect,restrictTo('pharmacist'),PharmacistController.updateMedicine);

module.exports = router;