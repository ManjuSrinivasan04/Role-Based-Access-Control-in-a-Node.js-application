const express = require("express");
const router = express.Router();
const userModel = require('../Model/user.model');
const Bcrypt = require("bcrypt");
const outbox = require('../Authentication/emailverification')

//Creating User

router.post('/user/create', async (req, res) => {
    req.body.password = Bcrypt.hashSync(req.body.password,10);
    const user = new userModel(req.body);
     try {
     
      await user.save();
      let email_array ;
      email_array = user.email;
      username= user.username;
      id = user._id;

     await outbox.outBox(email_array,id);
     
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (err) {
      if (err.name == 'ValidationError') {
        console.error('Error Validating!', err.message);
        res.status(422).json(err);
    } 
    else{
      res.status(400).send(err);
    }
    }
  });

  //Getting User details

  router.get('/user/finduser/:id', async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(
          { _id: req.params.id },
           {status:true}, 
           { new: true });
      console.log(req.body)
      res.status(200).json({
        success: true,
        msg: 'verified',
      })
    } catch (err) {
      res.status(500).send(err);
    }
  });
  module.exports = router;