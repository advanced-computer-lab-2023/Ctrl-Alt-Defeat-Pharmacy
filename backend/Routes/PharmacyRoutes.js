const express = require('express');
const MedicineController = require('./../Controllers/MedicineController');
const AdminstratorController = require('./../Controllers/AdminstratorController');
const PharmacistController = require('./../Controllers/PharmacistController');

const router = express.Router();

router.route('/medicine').get(MedicineController.getAllMedicine);
router.route('/admin').post(AdminstratorController.addAdmin);
router.route('/pharmacist/:id').delete(AdminstratorController.removePharmacist);
router.route('/patient/:id').delete(AdminstratorController.removePatient);
router.route('/pendingRequests').get(AdminstratorController.viewPendingPharmacists);
router.route('/quantities').get(PharmacistController.getMedicineQuantitySales);
router.route('/medicine/searchByName').get(MedicineController.getMedicineByName);
router.route('/medicine/searchByMedicalUse').get(MedicineController.getMedicineByMedicalUse);
router.route('/medicine').post(PharmacistController.addMedicine);
router.route('/medicine/:id').patch(PharmacistController.updateMedicine);
router.route('/pharmacist/:id').get(AdminstratorController.getPharmacist);
router.route('/patient/:id').get(AdminstratorController.getPatient);


module.exports = router;