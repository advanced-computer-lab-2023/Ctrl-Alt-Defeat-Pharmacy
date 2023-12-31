const express = require('express');
const AdminstratorController = require('./../Controllers/AdminstratorController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();
router.route('/addAdmin').post(protect,restrictTo('admin'),AdminstratorController.addAdmin);
router.route('/removePharmacist/:username').delete(protect,restrictTo('admin'),AdminstratorController.removePharmacist);
router.route('/removePatient/:username').delete(protect,restrictTo('admin'),AdminstratorController.removePatient);
router.route('/pendingRequests').get(protect,restrictTo('admin'),AdminstratorController.viewPendingPharmacists);
router.route('/pharmacistView/:id').get(protect,restrictTo('admin'),AdminstratorController.getPharmacist);
router.route('/patientView/:id').get(protect,restrictTo('admin'),AdminstratorController.getPatient);
router.route('/approvePharmacist').put(protect,restrictTo('admin'),AdminstratorController.approvePharmacist);
router.route('/rejectPharmacist').put(protect,restrictTo('admin'),AdminstratorController.rejectPharmacist);
router.route('/getAllPharmacists').get(protect,restrictTo('admin'),AdminstratorController.getAllPharmacists);
router.route('/getAllPatients').get(protect,restrictTo('admin'),AdminstratorController.getAllPatients);
router.route('/getCountOfPharmacists').get(protect,restrictTo('admin'),AdminstratorController.getCountOfPharmacists);
router.route('/getCountOfPatients').get(protect,restrictTo('admin'),AdminstratorController.getCountOfPatients);
router.route('/getAllOrders').get(protect,restrictTo('admin'),AdminstratorController.getAllOrders);
module.exports = router;
