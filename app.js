'use strict';

const express = require('express') ;
const app = express();
const jsonParser = require('body-parser').json;
const routes = require('./routes');
const logger = require('morgan');

app.use(logger("dev"));
app.use(jsonParser());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connect to  mongodb server
mongoose.connect("mongodb://localhost:27017/qa");

const db = mongoose.connection;

db.on("error", function(err) {
  console.err("connection error", err);
});
// db open and ready to listen
db.once("open", function() {
  console.log("db connection successful");
});

app.use("/questions" , routes);

// catch a 404 and forward to error handler
app.use(function(req,res,next){
    var err = new Error('Not Found ! ');
    err.status = 404 ;
    next(err);
});

//Error Handler
app.use(function(err , req , res , next){
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message
      }
    });
});

app.listen(3000 , function(){
  console.log('express Server is listening on Port 3000');
});
