const mongoose = require('mongoose');

const formsSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = mongoose.model('forms', formsSchema);
