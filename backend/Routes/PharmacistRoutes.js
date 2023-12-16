const express = require('express');
const PharmacistController = require('../Controllers/PharmacistController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router;
router.route('/register').post(PharmacistController.uploadPharmacistDocuments, PharmacistController.registerPharmacist);
router.route('/totalSales/:month').get(PharmacistController.getTotalSalesPerMonth);
router.route('/quantities').get(protect, restrictTo('pharmacist'), PharmacistController.getMedicineQuantitySales);
router
  .route('/addMedicine')
  .post(
    protect,
    restrictTo('pharmacist'),
    PharmacistController.uploadMedicinePicture,
    PharmacistController.addMedicine
  );
router
  .route('/editMedicine/:id')
  .patch(
    protect,
    restrictTo('pharmacist'),
    PharmacistController.uploadMedicinePicture,
    PharmacistController.updateMedicine
  );

module.exports = router;
