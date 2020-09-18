const User = require('../Model/user.model');
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const {roles} =require('../roles');
const sendmail = require('../Authentication/emailverification');
const router=require('../routes');


exports.signup = async (req, res) => {
    req.body.password = Bcrypt.hashSync(req.body.password,10);
    const user = new User(req.body);
     try {
     
      await user.save();
      let email_array ;
      email_array = user.email;
      username= user.username;
      password=user.password;
      role=user.role;
      id = user._id;

     await sendmail.sendMail(email_array,id);
     const accessToken = await jwt.sign({
        email: user.email }, 'user');
        user.accessToken = accessToken;
         await user.save();
           res.json({
             data: user,
             accessToken
  })
    } catch (err) {
      if (err.name == 'ValidationError') {
        console.error('Error Validating!', err.message);
        res.status(422).json(err);
    } 
    else{
      res.status(400).send(err);
    }
    }
  }



exports.login = async (req, res) => {
    try {

        let { email, password,status } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                 message: "Please Kindly Register Now" 
                });
        }
        let passwordCheck = await Bcrypt.compareSync(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json(
                {
                     success: false,
                     message: "Invalid" 
                    });
        } 
        
            const accessToken = await jwt.sign({
                 email: user.email }, 'user');

                 await User.findByIdAndUpdate(user._id, { accessToken })
                    res.status(200).json({
                   data: { email: user.email, role: user.role },
                             accessToken
  })

        

    } catch (err) {
        console.log(err);
        return res.status(400).json({ 
            success: false, 
            message: "Try again later" 
        });
    }
}

exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
   try {
    const permission = roles.can(req.user.role)[action](resource);
    if (!permission.granted) {
     return res.status(401).json({
      error: "You don't have enough permission to perform this action"
     });
    }
    next()
   } catch (error) {
    next(error)
   }
  }
 }
  
 exports.allowIfLoggedin = async (req, res, next) => {
  const { email} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user)
      return res.status(401).json({
        message: "You need to be logged in to access this route"
      });
  
    req.user = user;
    next();
   } catch (error) {
    next(error);
   }
 }



  exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
   }
    
   exports.getUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.updateUser = async (req, res, next) => {
    try {
     const update = req.body
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.deleteUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await User.findByIdAndDelete(userId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }

