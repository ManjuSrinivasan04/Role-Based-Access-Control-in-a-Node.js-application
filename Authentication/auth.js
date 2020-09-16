const express = require("express");
const router = express.Router();
const userModel = require('../Model/user.model');
const Bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//User login

router.post('/user/login', async (req, res) => {
    try {

        let { email, password,status } = req.body;
        let user = await userModel.findOne({ email: email });
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
        else if(user.status == false){
            return res.status(400).json({
                 success: false,
                  message: "your account is not verified" });
        }
        else {
            const token = await jwt.sign({
                 email: user.email }, 'user')
            return res.status(200).json({ 
                success: true,
                message: "Wow, Logged in successfully", 
                data: [{ token: token }] });

        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({ 
            success: false, 
            message: "Try again later" 
        });
    }
});

module.exports = router;