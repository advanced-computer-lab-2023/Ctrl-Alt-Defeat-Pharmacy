const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.ObjectId, ref: 'Patient', required: true },
  items: [
    {
      medicineId: { type: mongoose.Schema.ObjectId, ref: 'Medicine' },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number },
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
  status: { type: String, default: 'Pending' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
