const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UprofileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Uprofile = mongoose.model('Uprofile', UprofileSchema);
