const mongoose = require('mongoose');

const profSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SN: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Prof = mongoose.model('prof', profSchema);
