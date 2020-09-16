const userModel = require('../Model/user.model');
const jwt = require('jsonwebtoken');
function userVerification(req, res, next)
 {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid access' });
  }

  jwt.verify(token,'user',async(err, decoded) => {
    if (err) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid' });
    }

    req.email = decoded.email;
    let user = await userModel.findOne({ email: req.email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'You are not a valid User' });
    }
    next();

  });
};

  module.exports = userVerification;