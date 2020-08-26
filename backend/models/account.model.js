const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, default: '' },
  email: { type: String, default: '' },
  company: { type: String, default: '' },
  role: { type: String, default: '' },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;