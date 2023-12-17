const express = require('express');
const PharmacistController = require('../Controllers/PharmacistController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router;
router.route('/register').post(PharmacistController.uploadPharmacistDocuments, PharmacistController.registerPharmacist);
router.route('/totalSales/:month').get(protect, restrictTo('pharmacist', 'admin'), PharmacistController.getTotalSalesPerMonth);
router.route('/quantities').get(protect, restrictTo('pharmacist'), PharmacistController.getMedicineQuantitySales);
router.route('/addMedicine').post(protect, restrictTo('pharmacist'), PharmacistController.addMedicine);
router.route('/editMedicine/:id').patch(protect, restrictTo('pharmacist'), PharmacistController.updateMedicine);
router.route('/viewWallet').get(protect, restrictTo('pharmacist'), PharmacistController.viewWallet);

module.exports = router;
