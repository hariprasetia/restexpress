const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Konneksi ke mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// json body parser
app.use(bodyParser.json());

// include request method dari directory /routes/api.js
const routes = require('./routes/api');
// routing request method
app.use('/api', routes);

// Error handling minddleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({
    error: err.message
  });
});

/*
// Test request
app.get('/api', function(req, res){
  console.log('Get Request');
  res.send({status: "Ok"});
});
*/
// set port
app.listen(process.env.port || 4000, function(){
  console.log('Now listening for request ...');
});
