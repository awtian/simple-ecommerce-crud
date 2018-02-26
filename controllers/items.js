const itemModel = require('../models/items')

class Controllers {
  static getAll (req, res) {
    let jump = (req.query.page-1 || 0) * 6
    itemModel.find({},{},{skip: jump, limit:6})
      .then(data => res.send({prev:`http://localhost:3000/items?page=${jump/6}`, next:`http://localhost:3000/items?page=${(jump/6)+2}`, items:data}))
      .catch(err => res.status(500).send(err))
  }

  static getCate (req, res) {
    let cate = req.params.cate
    let jump = (req.query.page-1 || 0) * 6
    itemModel.find({category: cate},{},{skip: jump, limit:6})
      .then(data => res.send({prev:`http://localhost:3000/items/${cate}?page=${jump/6}`, next:`http://localhost:3000/items/${cate}?page=${(jump/6)+2}`, items:data}))
      .catch(err => res.status(500).send(err))
  }

  static search (req,res) {
    let query = req.params.query
    itemModel.find({"title":{ "$regex": query, "$options": "i" }})
      .then(data => res.send({items: data}))
      .catch(err => res.status(500).send(err))
  }

  static create (req,res) {
    itemModel.create({
      title : req.body.title,
      description : req.body.description,
      category : req.body.category,
      image: req.body.image,
      price: +req.body.price,
      stock : +req.body.stock,
    })
      .then(data => res.send( {message: 'Anda telah berhasil memasukkan data baru!', databaru: data}))
      .catch(err => res.status(500).send(err));
  }

  static getOne (req, res) {
    itemModel.findOne({_id : req.params.id})
      .then(data => res.send ({message: 'berikut adalah data yang anda minta!', book: data}))
      .catch(err => res.status(500).send(err));
  }

  static update (req,res) {
    itemModel.findOneAndUpdate({_id : req.params.id}, {
      title : req.body.title,
      description : req.body.description,
      category : req.body.category,
      image: req.body.image,
      price: +req.body.price,
      stock : +req.body.stock,
    }, {new: true})
      .then(data => res.send ({message: 'anda telah berhasil mengupdate data dari item ini!', book: data}))
      .catch(err => res.status(500).send(err))
  }

  static delete(req, res) {
    itemModel.findOne({_id : req.params.id})
    .then(data => {
      itemModel.findByIdAndRemove(req.params.id)
        .then(res.send ({message: 'Anda telah menghapus item ini', deleted: data}))
        .catch(err=> res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err));
  }
}

module.exports = Controllers