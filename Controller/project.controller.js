const express = require("express");
const userVerification = require('../Authentication/userverification')
const router = express.Router();
const projectModel = require('../Model/project.model');
const taskModel = require('../Model/task.model');

//creating the project 

router.post('/project/create', userVerification, async (req, res) => {
    const project = new projectModel(req.body);
    try {
        await project.save();
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (err) {
        if (err.name == 'ValidationError') {
            console.error('Error occured while validating the details', err.message);
            res.status(422).json(err);
        }
        else {
            res.status(400).send(err);
        }
    }
});

//Get the project with id

router.get('/project/view/:id', userVerification, async (req, res) => {
     const project = await projectModel.find(
         { user_id: req.params.id });
    for (let index = 0; index < project.length; index++) {
        const tasks = await taskModel.find(
            {project_id:project[index]._id});
        tasks.forEach(element => {
            project[index].task.push(element);
        });
    }
    try {
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

//Updating the project

router.post('/project/update/:id', async (req, res) => {
  try {
    await projectModel.findByIdAndUpdate(
        { _id: req.params.id }, req.body, { new: true });
    console.log(req.body)
    res.status(200).json({
      success: true,
      msg: 'Project Updated',
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete the project with id

router.delete('/project/delete/:id', userVerification, async (req, res) => {
    try {
      const project = await projectModel.findById(req.params.id);
    const tasks = await taskModel.find(
        {project_id:req.params.id});
       if (!project && !tasks) 
           res.status(404).send('No project with is id');
      project.remove();
      await tasks.every((t)=>t.remove())
      res.status(200).json({
        success: true,
        msg: 'Deleted this Project'
      });
    } catch (err) {
      res.status(500).send(err)
    }
  });

  router.delete('/project/projectdelete/:id',userVerification, async (req, res) => {
    try {
      const project = await projectModel.findById(req.params.id);
        if (!project) 
         res.status(404).send('No such Project');
      project.remove();
      res.status(200).json({
        success: true,
        msg: 'Your Project Deleted'
      });
    } catch (err) {
      res.status(500).send(err)
    }
  });



module.exports = router;