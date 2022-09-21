//import to dependacies modules on topp 
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const path = require('path');
const fs = require("file-system");
const multer = require("multer");
const ejs =require('ejs');




//middlewere insert here
const app = express();
app.use(express.json());
app.use(cookieParser());

//body parser using
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());



//view engine setting
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

// serving static files
app.use('/uploads', express.static('./uploads'));


//mobile login  routes
const mobileroutes =require("./routes/mobile_routes");
app.use("/api",mobileroutes);


//uploads routing files
app.get('/', function(req, res) {
     res.send('Home');


});
//error handler
 app.use((err,req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
 });

//export node_project.js  from here to server.js
module.exports=app;