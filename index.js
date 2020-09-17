const express = require("express");
const bodyParser = require("body-parser");
let mongoose=require('mongoose');
let jwt=require('jsonwebtoken')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/UserTask-Management",(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb");
    
});

app.use(express.json());

const user = require('./Controller/user.controller');
const auth = require('./Authentication/auth');
const project = require('./Controller/project.controller');
const task = require('./Controller/task.controller');
const routes=require('./routes');
const User=require('./Model/user.model');

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
   const accessToken = req.headers["x-access-token"];
   const { exp } = await jwt.verify(accessToken,'user');
   // Check if token has expired
   if (exp < Date.now().valueOf() / 1000) {
    return res.status(401).json({
     error: "JWT token has expired, please login to obtain a new one"
    });
   }
   next();
  } else {
   next();
  }
});

app.use('/', routes);
app.use(user);
app.use(auth);
app.use(project);
app.use(task);

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
