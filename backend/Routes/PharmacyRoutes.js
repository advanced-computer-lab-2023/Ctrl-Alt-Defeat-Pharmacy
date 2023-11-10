const express = require('express');
const MedicineController = require('./../Controllers/MedicineController');
const AdminstratorController = require('./../Controllers/AdminstratorController');
const PharmacistController = require('./../Controllers/PharmacistController');
const PatientController = require('./../Controllers/PatientController');

const router = express.Router();
router.route('/patients/register').post(PatientController.registerPatient);
router.route('/pharmacists/register').post(PharmacistController.registerPharmacist);
router.route('/medicine').get(MedicineController.getAllMedicine);
router.route('/admin').post(AdminstratorController.addAdmin);
router.route('/pharmacist/:id').delete(AdminstratorController.removePharmacist);
router.route('/patient/:id').delete(AdminstratorController.removePatient);
router.route('/pendingRequests').get(AdminstratorController.viewPendingPharmacists);
router.route('/quantities').get(PharmacistController.getMedicineQuantitySales);
router.route('/medicine/searchByName/:name').get(MedicineController.getMedicineByName);
router.route('/medicine/searchByMedicalUse/:medicalUse').get(MedicineController.getMedicineByMedicalUse);
router.route('/medicine').post(PharmacistController.addMedicine);
router.route('/medicine/:id').patch(PharmacistController.updateMedicine);
router.route('/pharmacist/:id').get(AdminstratorController.getPharmacist);
router.route('/patientView/:id').get(AdminstratorController.getPatient);
//Cart
router.route('/addToCart/:patientId').post(PatientController.addOverTheCounterMedicine);
router.route('/viewCart/:patientId').get(PatientController.viewCart);
router.route('/removeFromCart/:patientId').put(PatientController.removeItemFromCart);
router.route('/updateQuantity/:patientId').put(PatientController.updateQuantityOfItem);
//order
router.route('/checkout/:patientId').post(PatientController.Checkout);
router.route('/addAdress/:patientId').post(PatientController.addAddress);
router.route('/viewOrder/:orderId').get(PatientController.viewOrder);
router.route('/cancelOrder/:orderId').put(PatientController.cancelOrder);

module.exports = router;
