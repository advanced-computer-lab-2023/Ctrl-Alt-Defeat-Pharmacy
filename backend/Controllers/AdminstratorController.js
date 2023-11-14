const Admin = require('../Models/Admin');
const Patient = require('../Models/Patient');
const Pharmacist = require('../Models/Pharmacist');
const Medicine = require('../Models/Medicine');
const APIFeatures = require('../helpers/apiFeatures');

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
    const deletedPatient = await Patient.findOneAndDelete({ username: req.params.id });

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
    const deltedPharmacist = await Pharmacist.findOneAndDelete({ username: req.params.id });

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
exports.getPharmacist = async (req, res) => {
  try {
    const returnedPharmacist = await Pharmacist.findOne({ username: req.params.id });

    if (!returnedPharmacist) {
      return res.status(404).json({ message: 'Pharmacist not found' });
    }

    res.status(200).json({
      status: 'success',
      data: returnedPharmacist,
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
    const returnedPatient = await Patient.findOne({ username: req.params.id }).select('-prescriptions');

    if (!returnedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      status: 'success',
      data: returnedPatient,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.approvePharmacist = async (req, res) => {
  try {
    // Extract pharmacist username from the request body
    const { username } = req.body;

    // Find the pharmacist by username
    const existingPharmacist = await Pharmacist.findOne({ username });

    // If Pharmacist not found, respond with a 404 error
    if (!existingPharmacist) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if the Pharmacist is already accepted
    if (
      existingPharmacist.registrationStatus === 'accepted' ||
      existingPharmacist.registrationStatus === 'partially accepted'
    ) {
      // If the Pharmacist is already approved, respond with a 400 Bad Request
      return res.status(400).json({ error: 'Doctor is already approved' });
    }

    // Update the Pharmacist's registrationStatus to "partially accepted"
    const updatedPharmacist = await Pharmacist.findOneAndUpdate(
      { username },
      { registrationStatus: 'partially accepted' },
      { new: true }
    );

    // Respond with the updated doctor
    res.json(updatedPharmacist);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error approving doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
