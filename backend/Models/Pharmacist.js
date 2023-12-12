const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pharmacistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  Documents: {
    type: [String],
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
  registrationStatus: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  otp: {
    type: String,
  },
});

pharmacistSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;
