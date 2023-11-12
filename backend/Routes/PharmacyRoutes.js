const express = require('express');
const MedicineController = require('./../Controllers/MedicineController');

const router = express.Router();

router.route('/getAllMedicine').get(MedicineController.getAllMedicine);
router.route('/medicine/searchByName/:name').get(MedicineController.getMedicineByName);
router.route('/medicine/searchByMedicalUse/:medicalUse').get(MedicineController.getMedicineByMedicalUse);


module.exports = router;

