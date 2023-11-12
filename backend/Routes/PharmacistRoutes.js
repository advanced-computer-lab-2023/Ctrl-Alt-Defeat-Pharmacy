const express = require('express');
const PharmacistController = require('../Controllers/PharmacistController');


const router = express.Router();
router.route('/register').post(PharmacistController.registerPharmacist);
router.route('/quantities').get(PharmacistController.getMedicineQuantitySales);
router.route('/addMedicine').post(PharmacistController.addMedicine);
router.route('/editMedicine/:id').patch(PharmacistController.updateMedicine);

module.exports = router;
