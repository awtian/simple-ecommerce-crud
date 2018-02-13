const Model = require('../models/customers')

class Controller {
  static getAll (req, res) {
    Model.find({})
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err))
  }
  
  static create (req,res) {
    Model.create({
      name : req.body.name,
      memberid : req.body.memberid,
      address : req.body.address,
      zipcode : req.body.zipcode,
      phone : req.body.phone,
    })
      .then(data => res.send( {message: 'Anda telah berhasil memasukkan data baru!', databaru: data}))
      .catch(err => res.status(500).send(err));
  }

  static getOne (req, res) {
    Model.findOne({_id : req.params.id})
      .then(data => res.send ({message: 'berikut adalah data yang anda minta!', customer: data}))
      .catch(err => res.status(500).send(err));
  }

  static update (req,res) {
    Model.findOneAndUpdate({_id : req.params.id}, {
      name : req.body.name,
      memberid : req.body.memberid,
      address : req.body.address,
      zipcode : req.body.zipcode,
      phone : req.body.phone
    }, {new: true})
      .then(data => res.send ({message: 'anda telah berhasil mengupdate data dari buku ini!', book: data}))
      .catch(err => res.status(500).send(err))
  }

  static delete(req, res) {
    Model.findOne({_id : req.params.id})
    .then(data => {
      Model.findByIdAndRemove(req.params.id)
        .then(res.send ({message: 'Anda telah menghapus customer ini', deleted: data}))
        .catch(err=> res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err));
  }
}

module.exports = Controller