const express = require("express");
const userVerification = require('../Authentication/userverification')
const router = express.Router();
const taskModel = require('../Model/task.model');
const projectModel = require("../Model/project.model");

//creating the task

router.post('/task/create',userVerification, async (req, res) => {
     const task = new taskModel(req.body);
    try {
      await task.save();
      res.status(201).json({
        success: true,
        data: task
      });
    } catch (err) {
      if (err.name == 'ValidationError') {
        console.error('Oops,Its Validation Error', err.message);
        res.status(422).json(err);
    } 
    else
      res.status(400).send(err);
    }
  });

//Getting specific task alone

router.get('/task/findtask/:id',userVerification,async (req,res)=>{
     const task = await taskModel.find(
         {project_id:req.params.id}).populate('project_id','project_name');
    try {
        res.status(200).json({
          success: true,
          data: task
        });
      } catch (err) {
        res.status(500).send(err);
      }
});

//Getting task details

router.get('/task/findtask',userVerification,async (req,res)=>{
  const task = await taskModel.find(
      {project_id:req.params.id}).populate('project_id','project_name');
 try {
     res.status(200).json({
       success: true,
       data: task
     });
   } catch (err) {
     res.status(500).send(err);
   }
});

//Updating the task

router.post('/task/update/:id',userVerification, async (req, res) => {
  try {
    await taskModel.findByIdAndUpdate(
        { _id: req.params.id }, req.body, { new: true });
    console.log(req.body)
    res.status(200).json({
      success: true,
      msg: 'Task Updated',
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

//Deleting the task with id

router.delete('/task/remove/:id',userVerification, async (req, res) => {
  try {
    const tasks = await taskModel.findById(req.params.id);
     if (!tasks) res.status(404).send('No task found with this id kindly verify the id');
     tasks.remove()
    res.status(200).json({
      success: true,
      msg: 'Your task alone Deleted'
    });
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;