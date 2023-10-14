const Pharmacist = require('../Models/Pharmacist');
const Medicine = require('../Models/Medicine');
const APIFeatures = require('../helpers/apiFeatures');

exports.getMedicineQuantitySales = async (req, res) => {
  try {
    const returnedMedicine = await Medicine.find().select('name quantity sales');
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
