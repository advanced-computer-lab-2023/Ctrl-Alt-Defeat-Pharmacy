const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const FamilyMember = require('./FamilyMember'); // Assuming FamilyMember is properly defined

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    relationToPatient: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
  },
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
  wallet: {
    type: Number,
    default: 0,
  },
  nationalId: {
    type: Number,
    required: true,
    unique: true,
  },
  healthPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  healthPackageStatus: {
    type: String,
    enum: ['subscribed', 'unsubscribed', 'cancelled'],
    default: 'unsubscribed',
  },
  healthPackageRenewalDate: {
    type: Date,
  },
  healthPackageEndDate: {
    type: Date,
  },
  familyMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FamilyMember,
    },
  ],
  medicalHistory: [
    {
      type: String,
    },
  ],
  otp: {
    type: String,
  },
});

patientSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
