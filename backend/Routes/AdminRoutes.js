const express = require('express');
const AdminstratorController = require('./../Controllers/AdminstratorController');

const router = express.Router();
router.route('/addAdmin').post(AdminstratorController.addAdmin);
router.route('/removePharmacist/:id').delete(AdminstratorController.removePharmacist);
router.route('/removePatient/:id').delete(AdminstratorController.removePatient);
router.route('/pendingRequests').get(AdminstratorController.viewPendingPharmacists);
router.route('/pharmacistView/:id').get(AdminstratorController.getPharmacist);
router.route('/patientView/:id').get(AdminstratorController.getPatient);

module.exports = router;
