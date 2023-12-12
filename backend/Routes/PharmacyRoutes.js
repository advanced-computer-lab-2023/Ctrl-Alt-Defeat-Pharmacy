const express = require('express');
const MedicineController = require('./../Controllers/MedicineController');
const { protect } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/getAllMedicine').get(MedicineController.getAllMedicine);
router.route('/medicine/searchByName/:name').get(protect, MedicineController.getMedicineByName);
router.route('/medicine/searchByMedicalUse/:medicalUse').get(protect, MedicineController.getMedicineByMedicalUse);

module.exports = router;
