const Admin = require('../Models/Admin');
const Patient = require('../Models/Patient');
const Pharmacist = require('../Models/Pharmacist');
const Medicine = require('../Models/Medicine');
const APIFeatures = require('./apiFeatures');

exports.addAdmin = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);

    res.status(200).json({
      status: 'success',
      data: newAdmin,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.removePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.removePharmacist = async (req, res) => {
  try {
    const deltedPharmacist = await Pharmacist.findByIdAndDelete(req.params.id);

    if (!deltedPharmacist) {
      return res.status(404).json({ message: 'Pharmacist not found' });
    }

    res.status(200).json({
      status: 'success',
      data: deltedPharmacist,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.viewPendingPharmacists = async (req, res) => {
  try {
    const pendingPharmacists = await Pharmacist.find({ isRegistered: false });
    if (!pendingPharmacists || pendingPharmacists.length === 0) {
      return res.status(404).json({ message: 'No Pending requests' });
    }
    res.status(200).json({
      status: 'success',
      data: pendingPharmacists,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

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
exports.getMedicineQuantitySales = async (req, res) => {
  try {
    const returnedMedicine = await Medicine.find().select('quantity sales');
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

exports.addMedicine = async (req, res) => {
  try {
    const existingMedicine = await Medicine.findOne({ name: req.body.name });

    if (!existingMedicine) {
      const newMedicine = await Medicine.create(req.body);

      return res.status(200).json({
        status: 'success',
        data: newMedicine,
      });
    } else {
      existingMedicine.quantity += req.body.quantity;
      const updatedMedicine = await existingMedicine.save();

      return res.status(200).json({
        status: 'success',
        data: updatedMedicine,
      });
    }
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        updatedMedicine,
      },
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.getPharmacist = async (req, res) => {
  try {
    const returnedPharmacist = await Pharmacist.findById(req.params.id);

    if (!returnedPharmacist) {
      return res.status(404).json({ message: 'Pharmacist not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        returnedPharmacist,
      },
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const returnedPatient = await Patient.findById(req.params.id).select(-prescriptions);

    if (!returnedPharmacist) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        returnedPatient,
      },
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};
