const express = require("express");
const bodyParser = require("body-parser");
let mongoose=require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/UserTask-Management",(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb");
    
});

// Middleware
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "Hi,Your API Working" });
});

// PORT
const port = 8000;
app.listen(port,()=>{
    console.log("App is running on port ",port);
});


app.use(express.json());

const user = require('./Controller/user.controller');
const auth = require('./Authentication/auth');
const project = require('./Controller/project.controller');
const task = require('./Controller/task.controller');
app.use(user);
app.use(auth);
app.use(project);
app.use(task);
