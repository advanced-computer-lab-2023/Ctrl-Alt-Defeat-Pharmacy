const express = require('express');
const MedicineController = require('./../Controllers/MedicineController');

const router = express.Router();

router.route('/getAllMedicine').get(protect,MedicineController.getAllMedicine);
router.route('/medicine/searchByName/:name').get(protect,MedicineController.getMedicineByName);
router.route('/medicine/searchByMedicalUse/:medicalUse').get(protect,MedicineController.getMedicineByMedicalUse);


module.exports = router;

