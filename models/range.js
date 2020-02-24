const mongoose = require('mongoose');

const rangeSchema = new mongoose.Schema({
  name: String,
  trails: [{type: mongoose.Schema.ObjectId, ref: 'Trail' }]
});

module.exports = mongoose.model('Range', rangeSchema);