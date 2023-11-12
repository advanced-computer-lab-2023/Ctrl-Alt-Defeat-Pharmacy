const Patient = require('../Models/Patient');
const Medicine = require('../Models/Medicine');
const Cart = require('../Models/Cart');

exports.registerPatient = async (req, res) => {
  const newPatient = await Patient.create(req.body);
  res.status(201).json({
    message: 'patient created successfully',
    data: newPatient,
  });
};

exports.addOverTheCounterMedicine = async (req, res) => {
  try {
    const { patientUsername, medicineName, quantity } = req.body;

    if (!quantity || quantity == null || quantity == undefined || quantity == '' || quantity == 0) {
      quantity = 1;
    }

    const patient = await Patient.findOne({ username: patientUsername });
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


    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    const cart = await Cart.findOne({ patientId: patient._id });

    if (!cart) {
      const newCart = new Cart({ patientId: patient._id, items: [], totalPrice: 0 });
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
    const { patientUsername } = req.query;
    const patient = await Patient.findOne({ username: patientUsername });
    const cart = await Cart.findOne({ patientId: patient._id }).populate('items.medicineId');
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
    const { patientUsername, medicineId } = req.body;
    const patient = await Patient.findOne({ username: patientUsername });
    const cart = await Cart.findOne({ patientId: patient._id });
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
    const { patientUsername, medicineId, quantity } = req.body;
    const patient = await Patient.findOne({ username: patientUsername });
    const cart = await Cart.findOne({ patientId: patient._id });

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