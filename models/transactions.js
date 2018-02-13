const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const duedate = require('../helpers/duedate')

let transactionSchema =  new Schema({
  member : {type: Schema.Types.ObjectId, ref:'Customer'},
  days : {type: Number, default: 0},
  out_date : {type: Date, default: new Date()},
  due_date : {type: Date, default: duedate()},
  in_date : Date,
  fine : {type: Number, default: 0}, 
  itemlist : [{type: Schema.Types.ObjectId, ref:'Book'}]
});

transactionSchema.pre('update', (next) => {
  console.log('ini this ', this)
  this.days = in_date - out_date;
  this.fine = Math.max((this.days-7), 0) * 3000;
  next()
})

module.exports = mongoose.model('Transaction', transactionSchema)