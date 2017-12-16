const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// Get list ninja dari mongodb
router.get('/ninjas', function(req, res, next){
  /*
  Ninja.find({}).then(function(ninjas){
    res.send(ninjas);
  });
  */
  Ninja.geoNear({
    type: "Point",
    coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)]
    },
    {
      maxDistance: 10000, spherical: true
    }).then(function(ninjas){
    res.send(ninjas);
  }).catch(next);
});


// Post ninja ke mongodb
router.post('/ninjas', function(req, res, next){
  /*
  console.log(req.body);
  var ninja = new Ninja(req.body);
  ninja.save();
  */
  Ninja.create(req.body).then(function(ninja){
      res.send(ninja);
  }).catch(next);
});

// Update/Put ninja ke mongodb
router.put('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
    Ninja.findOne({_id:req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  }).catch(next);
  // res.send({type:'PUT'});
});


// Delete ninja ke mongodb
router.delete('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  }).catch(next);
  // res.send({type:'DELETE', id:req.params.id});
});

module.exports = router;
