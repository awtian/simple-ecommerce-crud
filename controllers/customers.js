const Model = require('../models/customers')

class Controller {
  static getAll (req, res) {
    Model.find({})
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err))
  }
  
  static create (req,res) {
    Model.create({
      username : req.body.username,
      password: req.body.password
      
    })
      .then(data => res.send( {message: 'Anda telah berhasil memasukkan data baru!', databaru: data}))
      .catch(err => res.status(500).send(err));
  }

  static login (req, res) {
    Model.findOne({username:req.body.username, password:req.body.password})
      .then(data => res.send({login:data._id}) )
      .catch(err => res.send({login:false}));
  }
}

module.exports = Controller