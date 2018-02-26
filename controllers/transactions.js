const transactionsModel = require('../models/transactions')
const daysgenerator = require('../helpers/daysgenerator')

class Controller {
  static getAll (req, res) {
    console.log(req.headers)
    console.log(req.body)
    transactionsModel.find({cust: req.headers.userid})
      .populate('items.id')
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
  }

  static create (req, res) {
    transactionsModel.create({
      cust: req.body.cust,
      items: req.body.items
    })
      .then(data => res.send({message: 'anda berhasil mendaftarkan transaksi baru', transaksi: data}))
      .catch(err => res.status(500).send(err));
  }


}

module.exports = Controller;