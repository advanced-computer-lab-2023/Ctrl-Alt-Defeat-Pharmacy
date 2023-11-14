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

    const { medicineName, quantity } = req.body;

    
    const medicine = await Medicine.findOne({ name: medicineName });
    const price = medicine.price * quantity;

    if (medicine.quantity == 0) {
      return res.status(400).json({ error: 'This medicine is out of stock' });
    }
    else if(quantity > medicine.quantity){
      return res.status(400).json({ error: 'Quantity is more than available' });
    }
    else{
      medicine.quantity -= quantity;
      await medicine.save();
    }


    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    const cart = await Cart.findOne({ patientId: req.user._id });

    if (!cart) {
      const newCart = new Cart({ patientId: req.user._id , items: [], totalPrice: 0 });
      newCart.items.push({ medicineId: medicine._id, quantity, price });
      newCart.totalPrice += price;
      await newCart.save();
      return res.status(201).json(newCart);
    }

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
    res.status(400).json({ error: err.message });
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
    const cart = await Cart.findOne({ patientId: req.user._id  });
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
    const cart = await Cart.findOne({ patientId: req.user._id  });

    const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);
    if (itemIndex !== -1) {
      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }

      const oldItemQuantity = cart.items[itemIndex].quantity;
      const oldItemTotalPrice = cart.items[itemIndex].price;
      
      if(quantity > oldItemQuantity){
        if (medicine.quantity == 0) {
          return res.status(400).json({ error: 'This medicine is out of stock' });
        }
        medicine.quantity -= (quantity - oldItemQuantity);
        await medicine.save();
      }
      else if(quantity < oldItemQuantity){
        medicine.quantity += (oldItemQuantity - quantity);
        await medicine.save();
      }


      //Updating the quantity of the medicine in the cart and in stock
      cart.items[itemIndex].quantity = quantity; 
      
      if (cart.items[itemIndex].quantity == 0) {  //Checking if the quantity of the medicine in the cart is 0
        cart.totalPrice -= oldItemTotalPrice;
        cart.items.splice(itemIndex, 1);
        await cart.save();

        if (cart.items.length == 0) { //Deleting the cart if it is empty
          cart.totalPrice = 0;
          await Cart.deleteOne({ _id: cart._id }); 
        }
      } 
      else { //Updating the price of the medicine in the cart and the total price of the cart
        cart.items[itemIndex].price = medicine.price * quantity; 

        if (cart.items[itemIndex].price > oldItemTotalPrice) 
        cart.totalPrice += (cart.items[itemIndex].price - oldItemTotalPrice) * (quantity - oldItemQuantity);
        else 
          cart.totalPrice -= (oldItemTotalPrice - cart.items[itemIndex].price) * (oldItemQuantity - quantity);

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

exports.Checkout = async (req, res) => {
  try {
    
    const patientId = req.user._id;
    const patient = await Patient.findOne({ _id: patientId });
    const cart = await Cart.findOne({ patientId: req.user._id });
    const items = cart.items.map(item => ({ medicineId: item.medicineId, quantity: item.quantity, price: item.price }));

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const totalPrice = Math.floor((cart.totalPrice + 5 + cart.totalPrice * 0.05) * 100) / 100;
    const selectedAddressId = req.body.addressId;
    const deliveryAddress = req.user.addresses.find(address => address._id.toString() === selectedAddressId.toString());

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
      await medicine.save();
    });
    
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};