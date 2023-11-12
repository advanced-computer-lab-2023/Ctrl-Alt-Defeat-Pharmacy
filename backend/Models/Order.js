const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.ObjectId, ref: 'Patient', required: true },
  cart : { type: mongoose.Schema.ObjectId, ref: 'Cart', required: true },
  addresses: [
    {
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
  ],
  Date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;