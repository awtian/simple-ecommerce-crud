const mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
  name : String,
  memberid : String,
  address : String,
  zipcode : String,
  phone : String
})

module.exports = mongoose.model('Customer', customerSchema);