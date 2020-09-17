const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:'UserName required'

    },
    role:{
        type: String,
        default: 'user',
        enum: ['user','developer','manager']
    },
    status:{
        type: Boolean,
        default: false
    },
    email:{
        type:String,
        required:'Emailid required',
        unique:true,
    },
    password:{
        type:String,
        required:'Password required',

    },
    accessToken: {
        type: String
       }
});

const user = mongoose.model('user',userSchema);
module.exports = user;