const mongoose = require('mongoose');
const task = require('../Model/task.model');

const projectSchema  = new mongoose.Schema({
    project_name :{
        type : String,
        required : 'Add project name'
    },
    description :{
        type: String,
        required:'Add description',
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    },
   
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
    }],
    
});

const project = mongoose.model('project',projectSchema,'projects');
module.exports = project;