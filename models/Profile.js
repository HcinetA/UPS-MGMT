const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  prof: {
    type: Schema.Types.ObjectId,
    ref: 'prof',
  },
  email: {
    type: String,
  },
  tel: {
    type: String,
  },

  status: {
    type: String,
    required: true,
  },
  classes: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
