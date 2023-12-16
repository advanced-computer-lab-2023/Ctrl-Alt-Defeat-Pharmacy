const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.ObjectId, ref: 'Patient', required: true },
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
    },
  ],
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  totalPrice: { type: Number, required: true },
  Date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
