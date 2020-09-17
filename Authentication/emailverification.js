const nodemailer = require('nodemailer');

let sendMail = async function(email_array,id) {
    console.log('Hello User')
    let redirecturl ='http://localhost:3000/user/confirmemail/'+id
   console.log(redirecturl)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'manju@gmail.com',
        pass: 'manju'
      }
    });
    
    var mailOptions = {
      from: 'manju@gmail.com',
      to: email_array,
      subject: 'User Verify your email',
      html: 'hai Welcome! <br> <a href="'+redirecturl+'" target="_blank">Verify your email</a>',
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  module.exports = {
    sendMail,
  };