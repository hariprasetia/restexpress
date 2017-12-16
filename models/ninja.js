const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// membuat schema geolocation di mongodb
const GeoSchema = new Schema({
  type:{
    type: String,
    default: "Point"
  },
  coordinates:{
    type: [Number],
    index: "2dsphere"
  }
});


// membuat schema ninja di mongodb
const NinjaSchema = new Schema({
  name:{
    type: String,
    required: [true, 'Name is required']
  },
  rank:{
    type: String,
  },
  available:{
    type: Boolean,
    default: false
  },
  //  menambah schema geolocation kedalam schema ninja
  geometry: GeoSchema
})

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;
