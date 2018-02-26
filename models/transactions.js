const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const duedate = require('../helpers/duedate')

let transactionSchema =  new Schema({
  cust : {type: Schema.Types.ObjectId, ref:'Customer'},
  items : [{
    id: {type: Schema.Types.ObjectId, ref:'Item'},
    count: Number
  }],
  createdAt: {type: Date, default: new Date()}
});

// transactionSchema.pre('update', (next) => {
//   console.log('ini this ', this)
//   this.days = in_date - out_date;
//   this.fine = Math.max((this.days-7), 0) * 3000;
//   next()
// })

module.exports = mongoose.model('Transaction', transactionSchema)