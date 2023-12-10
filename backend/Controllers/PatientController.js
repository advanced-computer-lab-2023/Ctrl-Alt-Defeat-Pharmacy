// const Admin = require('../Models/Admin');
// const Pharmacist = require('../Models/Pharmacist');
const Patient = require('../Models/Patient');
const Medicine = require('../Models/Medicine');
const Cart = require('../Models/Cart');
const Order = require('../Models/Order');

// const findByUsername = async username => {
//   let user;

//   user = await Admin.findOne({ username });
//   if (user) return { user, role: 'admin' };

//   user = await Patient.findOne({ username });
//   if (user) return { user, role: 'patient' };

//   user = await Pharmacist.findOne({ username });
//   if (user) return { user, role: 'pharmacist' };

//   return {};
// };

exports.registerPatient = async (req, res) => {
  // const { user } = await findByUsername(req.body.username);
  // if (user) {
  //   res.status(200).json({
  //     status: 'failed',
  //     message: 'username already exists',
  //   });
  //   return;
  // }
  const newPatient = await Patient.create(req.body);
  res.status(201).json({
    message: 'patient created successfully',
    data: newPatient,
  });
};

exports.addOverTheCounterMedicine = async (req, res) => {
  try {
    const { medicineName, quantity } = req.body;
    const patientId = req.user._id;

    const medicine = await Medicine.findOne({ name: medicineName });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
//check if it is a prescription medicine 
    if (medicine.prescription) {
      const patient = await Patient.findById(patientId).populate('prescriptions.medicines');

      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      const hasMedicineInPrescriptions = patient.prescriptions.some(prescription =>
        prescription.medicines.some(prescribedMedicine =>
          prescribedMedicine.name === medicineName
        )
      );

      if (!hasMedicineInPrescriptions) {
        return res.status(400).json({ error: 'This medicine is not in your recent prescriptions' });
      }
    }

    const price = medicine.price * quantity;

    if (medicine.quantity === 0) {
      return res.status(400).json({ error: 'This medicine is out of stock' });
    }

    if (quantity > medicine.quantity) {
      return res.status(400).json({ error: 'Quantity is more than available' });
    }

    // Deduct quantity from available stock
    medicine.quantity -= quantity;
    await medicine.save();

    // Check if the patient has a cart
    const cart = await Cart.findOne({ patientId });

    if (!cart) {
      const newCart = new Cart({ patientId, items: [], totalPrice: 0 });
      newCart.items.push({ medicineId: medicine._id, quantity, price });
      newCart.totalPrice += price;
      await newCart.save();
      return res.status(201).json(newCart);
    }

    // Check if the medicine is already in the cart
    const existingItem = cart.items.find(item => item.medicineId.toString() === medicine._id.toString());

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price += price;
      cart.totalPrice += price;
    } else {
      cart.items.push({ medicineId: medicine._id, quantity, price });
      cart.totalPrice += price;
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ patientId: req.user._id }).populate('items.medicineId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { medicineId } = req.body;
    const cart = await Cart.findOne({ patientId: req.user._id });
    const medicine = await Medicine.findOne({ _id: medicineId });

    const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);

    if (itemIndex !== -1) {
      const removedItem = cart.items.splice(itemIndex, 1)[0];
      cart.totalPrice -= removedItem.price;
      medicine.quantity += removedItem.quantity;
      await medicine.save();
      await cart.save();

      if (cart.items.length == 0) {
        cart.totalPrice = 0;
        await Cart.deleteOne({ _id: cart._id }); // delete cart
      }
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
    const { medicineId, quantity } = req.body;
    const cart = await Cart.findOne({ patientId: req.user._id });

    const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);
    if (itemIndex !== -1) {
      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }

      const oldItemQuantity = cart.items[itemIndex].quantity;
      const oldItemTotalPrice = cart.items[itemIndex].price;

      if (quantity > oldItemQuantity) {
        if (medicine.quantity == 0) {
          return res.status(400).json({ error: 'This medicine is out of stock' });
        }
        medicine.quantity -= quantity - oldItemQuantity;
        await medicine.save();
      } else if (quantity < oldItemQuantity) {
        medicine.quantity += oldItemQuantity - quantity;
        await medicine.save();
      }

      //Updating the quantity of the medicine in the cart and in stock
      cart.items[itemIndex].quantity = quantity;

      if (cart.items[itemIndex].quantity == 0) {
        //Checking if the quantity of the medicine in the cart is 0
        cart.totalPrice -= oldItemTotalPrice;
        cart.items.splice(itemIndex, 1);
        await cart.save();

        if (cart.items.length == 0) {
          //Deleting the cart if it is empty
          cart.totalPrice = 0;
          await Cart.deleteOne({ _id: cart._id });
        }
      } else {
        //Updating the price of the medicine in the cart and the total price of the cart
        cart.items[itemIndex].price = medicine.price * quantity;

        if (cart.items[itemIndex].price > oldItemTotalPrice)
          cart.totalPrice += (cart.items[itemIndex].price - oldItemTotalPrice) * (quantity - oldItemQuantity);
        else cart.totalPrice -= (oldItemTotalPrice - cart.items[itemIndex].price) * (oldItemQuantity - quantity);

        await cart.save();
      }

      res.json(cart);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createStripeCheckoutSession = async (req, res) => {
  try {
    const cart = await Cart.findOne({ patientId: req.user._id }).populate('items.medicineId');
    const { addressId } = req.body;
    let line_items = cart.items.map(item => ({
      price_data: {
        currency: 'egp',
        product_data: {
          name: item.medicineId.name,
        },
        unit_amount: Math.floor(item.medicineId.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items = [
      ...line_items,
      { price_data: { currency: 'egp', product_data: { name: 'Delivery Fees' }, unit_amount: 500 }, quantity: 1 },
      {
        price_data: {
          currency: 'egp',
          product_data: { name: 'Service fees' },
          unit_amount: Math.floor(cart.totalPrice * 0.05 * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: req.user.email,
      client_reference_id: req.user._id,
      success_url: `http://localhost:5173/patients/checkout?addressId=${addressId}&success=true`,
      cancel_url: 'http://localhost:5173/patients/checkout',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.Checkout = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const patientId = req.user._id;
    const patient = await Patient.findOne({ _id: patientId });
    const cart = await Cart.findOne({ patientId: req.user._id });
    const items = cart.items.map(item => ({ medicineId: item.medicineId, quantity: item.quantity, price: item.price }));
    //TODO: update the medicines sales
    const medicineIds = items.map(item => item.medicineId);
    const medicines = await Medicine.find({ _id: { $in: medicineIds } });

    medicines.forEach(medicine => {
      const item = items.find(item => item.medicineId.toString() === medicine._id.toString());
      medicine.sales += item.quantity;
      medicine.save();
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const totalPrice = Math.floor((cart.totalPrice + 5 + cart.totalPrice * 0.05) * 100) / 100;
    const selectedAddressId = req.body.addressId;
    const deliveryAddress = req.user.addresses.find(address => address._id.toString() === selectedAddressId.toString());

    if (paymentMethod === 'wallet') {
      if (patient.wallet < totalPrice) {
        return res.status(200).json({ error: 'Insufficient funds in your wallet' });
      }
      patient.wallet -= totalPrice;
      await patient.save();
    }

    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Invalid request payload' });
    }

    console.log(items);

    const newOrder = new Order({
      patient: patient,
      items: items,
      address: {
        street: deliveryAddress.street,
        city: deliveryAddress.city,
        country: deliveryAddress.country,
      },
      totalPrice: totalPrice,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    cart.items = [];
    await cart.deleteOne();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newAddress = req.body;
    patient.addresses.push(newAddress);
    await patient.save();

    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);

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
    const order = await Order.findById(req.params.orderId).populate('items.medicineId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status: 'cancelled' });

    order.items.forEach(async item => {
      const medicine = await Medicine.findById(item.medicineId);
      medicine.quantity += item.quantity;
      medicine.sales -= item.quantity;
      await medicine.save();
    });
    if(order.paymentMethod !== 'Cash on Delivery') {
      const patient = await Patient.findById(order.patient);
      patient.wallet += order.totalPrice;
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.viewAllOrders = async (req, res) => {
  try {

    const patient = await Patient.findById(req.user._id);    
    
    const allOrders = await Order.find({ patient: patient, status: { $ne: 'cancelled' } }).populate('items.medicineId');

   

    res.status(200).json(allOrders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.viewWallet = async (req, res) => {
  try {
    const user = await Patient.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ wallet: user.wallet, message: 'Wallet balance retrieved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.viewAlternatives = async (req, res) => {
  try {
    const { medicineName } = req.params;

    const originalMedicine = await Medicine.findOne({ name: medicineName });

    if (!originalMedicine) {
      return res.status(404).json({ status: 'fail', message: 'Medicine not found' });
    }
    const alternatives = await Medicine.find({
      _id: { $ne: originalMedicine._id }, 
      ingredients: { $in: originalMedicine.ingredients }, 
      quantity: { $gt: 0 }, 
      archive: false,
    });
    res.status(200).json({ status: 'success', data: alternatives });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
  }
}
exports.getAllMedicine = async (req, res) => {
  try {
    const features = new APIFeatures(Medicine.find({ archive: false }), req.query).filter().sort();
    const allMedicine = await features.query;

    res.status(200).json({
      status: 'success',
      results: allMedicine.length,
      data: allMedicine,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
  }
};

exports.getMedicineByName = async (req, res) => {
  try {
    const substring = req.params.name;
    const returnedMedicine = await Medicine.find({ name: { $regex: substring, $options: 'i' }, archive: false }).exec();
    res.status(200).json({
      status: 'success',
      data: returnedMedicine,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
  }
};

exports.getMedicineByMedicalUse = async (req, res) => {
  try {
    const returnedMedicine = await Medicine.find({ medicalUse: req.params.medicalUse, archive: false });
    res.status(200).json({
      status: 'success',
      data: returnedMedicine,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
  }
};


