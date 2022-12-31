const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    trim:true,
    minlength: 10,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;