const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:'UserName required'

    },
    role:{
        type: String,
        enum: ['user','developer'],
        default: 'user'
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
});

const user = mongoose.model('user',userSchema);
module.exports = user;