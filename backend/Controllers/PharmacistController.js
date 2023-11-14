const Pharmacist = require('../Models/Pharmacist');
const Medicine = require('../Models/Medicine');

exports.registerPharmacist = async (req, res) => {
  const newPharmacist = await Pharmacist.create(req.body);
  newPharmacist.registrationStatus = 'pending';
  res.status(201).json({
    message: 'pending approval of the new pharmacist',
    data: newPharmacist,
  });
};

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
      existingMedicine.quantity += parseInt(req.body.quantity);
      const updatedMedicine = await existingMedicine.save();

      return res.status(200).json({
        status: 'success',
        data: updatedMedicine,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findOneAndUpdate({ name: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({
      status: 'success',
      data: updatedMedicine,
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};
