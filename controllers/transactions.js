const Model = require('../models/transactions')
const daysgenerator = require('../helpers/daysgenerator')

class Controller {
  static getAll (req, res) {
    Model.find()
      .populate('member').populate('booklist')
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
  }

  static create (req, res) {
    Model.create({
      member: req.body.member,
      booklist: req.body.booklist
    })
      // .populate('member').populate('booklist')
      .then(data => res.send({message: 'anda berhasil mendaftarkan transaksi baru', transaksi: data}))
      .catch(err => res.status(500).send(err));
  }

  static getOne (req, res) {
    Model.findById(req.params.id)
      .populate('member').populate('booklist')
      .then(data => res.send({message: 'ini adalah transaksi yang anda minta', transaksi: data}))
      .catch(err => res.status(500).send(err));
  }

  static bookin (req, res) {

    Model.findById(req.params.id)
      .then(data => {
        let date = new Date()
        if (req.body.in_date !== undefined) date = new Date(req.body.in_date)
        
        let days = daysgenerator(data.out_date, date);

        let fine = Math.max((days-7), 0)*3000

        Model.findOneAndUpdate({
          _id:req.params.id
        },{
          $set : {
          in_date: date,
          days : days,
          fine: fine,
        }}, {new: true})
          .then(data2 => res.send({message: "anda telah mengembalikan buku pada transaksi ini", transaksi: data2}))
          .catch(err => res.status(500).send(err));

      })
      .catch(err => res.status(500).send(err));
    }


    static delete(req, res) {
      Model.findOne({_id : req.params.id})
      .populate('member').populate('booklist')
      .then(data => {
        Model.findByIdAndRemove(req.params.id)
          .then(res.send ({message: 'Anda telah menghapus transaksi ini', deleted: data}))
          .catch(err=> res.status(500).send(err))
      })
      .catch(err => res.status(500).send(err));
    }

}

module.exports = Controller;