const express = require('express');
const MedicineController = require('./../Controllers/MedicineController');
const { protect,restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/getAllMedicine').get(protect,restrictTo('pharmacist','admin'),MedicineController.getAllMedicine);
router.route('/medicine/searchByName/:name').get(protect,restrictTo('pharmacist','admin'),MedicineController.getMedicineByName);
router.route('/medicine/searchByMedicalUse/:medicalUse').get(protect,restrictTo('pharmacist','admin'),MedicineController.getMedicineByMedicalUse);


module.exports = router;
