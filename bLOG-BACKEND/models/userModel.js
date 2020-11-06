const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  mobile: {
    type: Number,
    required: [true, 'Please enter a mobile number'],
    match: [
      /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/,
      'Please enter a valid mobile number',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please Enter a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm your password'],
    validate: {
      validator: function (element) {
        return element === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: {
    type: Date,
    select: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.passwordConfirm = undefined;
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  actualPassword
) {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

userSchema.methods.checkPasswordChange = function (timestamp) {
  if (!this.passwordChangedAt) {
    return false;
  }
  const lastChange = this.passwordChangedAt.getTime() / 1000;
  return lastChange > timestamp;
};
module.exports = mongoose.model('User', userSchema);
