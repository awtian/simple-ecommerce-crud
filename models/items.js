const mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  title : String,
  description: String,
  category : String,
  image : String,
  price: Number,
  stock : Number
})

module.exports = mongoose.model('Item', itemSchema);