const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  __v: {
    type: Number,
    select: true
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  phone: {
    type: Number,
    required: true,
    min: 6
  },
  address: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  isActive: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  privateCompany: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  deductionsPortfolio: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  token: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Companys', companySchema);
