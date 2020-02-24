require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports.Animal = require('./animal');
module.exports.Range = require('./range');
module.exports.Trail = require('./trail');
