'use strict';

const express = require('express') ;
const app = express();
const jsonParser = require('body-parser').json;
const routes = require('./routes');
const logger = require('morgan');

app.use(logger("dev"));
app.use(jsonParser());
app.use("/questions" , routes);


app.listen(3000 , function(){
  console.log('express Server is listening on Port 3000');
});
