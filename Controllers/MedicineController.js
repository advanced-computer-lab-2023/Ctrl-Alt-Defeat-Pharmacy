const Admin = require('../Models/Admin');
const Patient = require('../Models/Patient');
const Pharmacist = require('../Models/Pharmacist');
const Medicine = require('../Models/Medicine');
const APIFeatures = require('../helpers/apiFeatures');

exports.getAllMedicine = async (req, res) => {
    try {
      const features = new APIFeatures(Medicine.find(), req.query).filter().sort();
      const allMedicine = await features.query;
  
      res.status(200).json({
        status: 'success',
        results: allMedicine.length,
        data: {
          allMedicine,
        },
      });
    } catch {
      res.status(404).json({
        status: 'fail',
        message: 'err',
      });
    }
  };

  exports.getMedicineByName = async (req, res) => {
    try {
      const returnedMedicine = await Medicine.findOne({ name: { $regex: new RegExp(req.body.name, 'i') } });
      res.status(200).json({
        status: 'success',
        data: returnedMedicine,
      });
    } catch {
      res.status(404).json({
        status: 'fail',
        message: 'err',
      });
    }
  };

  exports.getMedicineByMedicalUse = async (req, res) => {
    try {
      const returnedMedicine = await Medicine.find({ medicinalUse: { $regex: new RegExp(req.body.medicinalUse, 'i') } });
      res.status(200).json({
        status: 'success',
        data: returnedMedicine,
      });
    } catch {
      res.status(404).json({
        status: 'fail',
        message: 'err',
      });
    }
  };