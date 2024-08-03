const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
},{
  versionKey:false
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;
