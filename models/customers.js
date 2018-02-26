const mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
  username : String,
  password : String
})

module.exports = mongoose.model('Customer', customerSchema);