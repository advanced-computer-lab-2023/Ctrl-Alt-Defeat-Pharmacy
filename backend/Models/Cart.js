const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  patientId: { type: String, required: true },  // Associating the cart with a patient
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
