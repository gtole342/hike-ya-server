const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  class: String,
  commonName: String,
  scientificName: {
    type: String,
    unique: true
  },
  wikiLink: String,
  photo: String,
})

module.exports = mongoose.model('Animal', animalSchema)