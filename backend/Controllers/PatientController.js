const Patient = require('../Models/Patient');
const Medicine = require('../Models/Medicine');
const Cart = require('../Models/Cart');
const Order = require('../Models/Order');
exports.registerPatient = async (req, res) => {
  const newPatient = await Patient.create(req.body);
  res.status(201).json({
    message: 'patient created successfully',
    data: newPatient,
  });
};

exports.addOverTheCounterMedicine = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { medicineId, quantity } = req.body;

    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    let cart = await Cart.findOne({ patientId });

    if (!cart) {
      cart = new Cart({ patientId, items: [] });
    }

    const existingItem = cart.items.find(item => item.medicineId.toString() === medicineId);
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

exports.removeItemFromCart = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { medicineId } = req.body;
    const cart = await Cart.findOne({ patientId });

    const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.json(cart);
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuantityOfItem = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { medicineId, quantity } = req.body;
    const cart = await Cart.findOne({ patientId });

    const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.Checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ patientId: req.params.patientId }).exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const patientId = cart.patientId;
    const itemsAdded = cart.items;
    const totalPriceTemp = itemsAdded.reduce((total, item) => {
      const medicinePrice = item.medicineId.price || 0;
      return total + medicinePrice * item.quantity;
    }, 0);

    const selectedAddressId = req.body.selectedAddressId;
    const newAddress = req.body.newAddress;

    let deliveryAddress;
    if (selectedAddressId) {
      deliveryAddress = await Patient.findById(patientId)
        .select('addresses')
        .then(patient => patient?.addresses.id(selectedAddressId));
    } else if (newAddress) {
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      patient.addresses.push(newAddress);
      await patient.save();
      deliveryAddress = newAddress;
    } else {
      return res.status(400).json({ message: 'Please provide either a selected address or a new address.' });
    }

    const newOrder = new Order({
      patient: patientId,
      items: itemsAdded,
      totalPrice: totalPriceTemp,
      deliveryAddress,
    });

    const savedOrder = await newOrder.save();

    cart.items = [];
    await cart.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newAddress = req.body;
    patient.addresses.push(newAddress);
    await patient.save();

    res.status(201).json({ message: 'Address added successfully', patient });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ addresses: patient.addresses });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.viewOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderId, { status: 'cancelled' });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
