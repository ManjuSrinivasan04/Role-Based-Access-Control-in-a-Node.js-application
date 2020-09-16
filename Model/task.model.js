const mongoose = require('mongoose');

const taskSchema  = new mongoose.Schema({
    task_name :{
        type : String,
        required : 'Add task name'
    },
    description :{
        type: String,
        required:'Add description',
    },
    project_id:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'project'
    }
    
});
const task = mongoose.model('task',taskSchema);
module.exports = task;