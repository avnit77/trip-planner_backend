const mongoose = require('mongoose');
const getWeather = require('../services/weather');

const schema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  woeid: {
    type: Number,
    required: true
  }
});

schema.statics.populateWeather = async function() {
  const woeid = this.woeid;
  return await getWeather(woeid);
};

module.exports = mongoose.model('Plan', schema);
