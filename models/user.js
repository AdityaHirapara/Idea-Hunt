const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  String,
  email:   String,
  password: String,
  token: String,
  joining: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);