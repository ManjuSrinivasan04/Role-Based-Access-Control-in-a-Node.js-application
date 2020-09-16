const nodemailer = require('nodemailer');

let outBox = async function(email_array,id) {
    console.log('Verifying your Email');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'manju82@gmail.com',
        pass: '1234manju'
      }
    });
    
    var mailOptions = {
      from: 'manju@gmail.com',
      to: email_array,
      subject: 'Email Verfication'
      
    };
    
    transporter.outBox(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent to : ' + info.response);
      }
    });
  }

  module.exports = {
    outBox,
  };