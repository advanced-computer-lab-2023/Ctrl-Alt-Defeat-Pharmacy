const express = require('express');
const AdminstratorController = require('./../Controllers/AdminstratorController');
const { protect , restrictTo } = require('../Middlewares/authMiddlewares');


const router = express.Router();
router.route('/addAdmin').post(protect,restrictTo('admin'),AdminstratorController.addAdmin);
router.route('/removePharmacist/:id').delete(protect,restrictTo('admin'),AdminstratorController.removePharmacist);
router.route('/removePatient/:id').delete(protect,restrictTo('admin'),AdminstratorController.removePatient);
router.route('/pendingRequests').get(protect,restrictTo('admin'),AdminstratorController.viewPendingPharmacists);
router.route('/pharmacistView/:id').get(protect,restrictTo('admin'),AdminstratorController.getPharmacist);
router.route('/patientView/:id').get(protect,restrictTo('admin'),AdminstratorController.getPatient);

module.exports = router;
