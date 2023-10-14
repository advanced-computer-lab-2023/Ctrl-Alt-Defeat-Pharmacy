const Patient = require('../Models/Patient');

exports.registerPatient = async (req, res) => {
  const newPatient = await Patient.create(req.body);

  res.status(201).json({
    message: 'patient created successfully',
    data: newPatient,
  });
};
