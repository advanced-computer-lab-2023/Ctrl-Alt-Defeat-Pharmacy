const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  patientId: { 
    type: String, 
    required: true },
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
    },
  ],
  totalPrice: { type: Number, default: 0 },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

