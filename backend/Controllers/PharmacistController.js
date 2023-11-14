const Pharmacist = require('../Models/Pharmacist');
const Medicine = require('../Models/Medicine');

exports.registerPharmacist = async (req, res) => {
  const newDoctor = await Pharmacist.create(req.body);

  newDoctor.registrationStatus = undefined;
  res.status(201).json({
    message: 'pending approval of the new pharmacist',
    data: newDoctor,
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
exports.uploadDocuments = async (req, res) => {
  const uploadedFiles = req.files ;

  try {
    const fileInformation = [];

    // Loop through the uploaded files and save their information
    for (const file of uploadedFiles) {
      // Here, you can save the file information in the pharmacist model or any other place as needed
      const fileData = {
        filename: file.originalname,
        path: file.path, // This is the local path where the file is saved
      };
      fileInformation.push(fileData);
    }
    res.json({ message: 'Documents uploaded successfully.' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};