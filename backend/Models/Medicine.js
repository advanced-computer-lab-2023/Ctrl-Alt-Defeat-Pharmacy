const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  sales: {
    type: Number,
    default: 0,
    min: 0,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  medicalUse: {
    type: String,
  },
  archive: {
     type: Boolean,
      default: false },
  prescription: {
     type: Boolean, 
     required: true },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
