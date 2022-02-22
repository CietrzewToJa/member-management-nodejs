const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const crypto = require('crypto');

var Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
