const Patient = require('../Models/Patient');
const Medicine = require('../Models/Medicine');
const Cart =  require('../Models/Cart');

exports.registerPatient = async (req, res) => {
  const newPatient = await Patient.create(req.body);

  res.status(201).json({
    message: 'patient created successfully',
    data: newPatient,
  });
};

exports.addOverTheCounterMedicine = async(req , res) => {

  try {
    const { medicineId, quantity } = req.body;
    const { patientId } = req.params;

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    let cart = await Cart.findOne({ patientId });

    if (!cart) {
      cart = new Cart({ patientId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.medicineId.toString() === medicineId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ medicineId, quantity: quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
   

};

exports.viewCart = async (req, res) => {
  try {
    const { patientId } = req.params;
    const cart = await Cart.findOne({ patientId }).populate('items.medicineId');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeItemFromCart = async(req,res) => {
  try {
    const { patientId } = req.params;
    const { medicineId } = req.body;
    const cart = await Cart.findOne({ patientId });
    const itemIndex = cart.items.findIndex((item) => item.medicineId.toString() === medicineId);
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();
    res.json(cart);

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }  

};

exports.updateQuantityOfItem = async(req,res) => {



};