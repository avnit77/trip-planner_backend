const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
    required: true
  },
  activity: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ItineraryItem', schema);
