const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
  _id: Number,
  latitude: Number,
  longitude: Number,
  name: String,
  difficulty: String,
  distance: Number,
  ascent: Number,
  descent: Number,
  high: Number,
  low: Number,
  rating: Number,
  location: String,
  description: String,
  distance: Number,
  animals: [{type: mongoose.Schema.ObjectId, ref: 'Animal'}]


})

module.exports = mongoose.model('Trail', trailSchema)