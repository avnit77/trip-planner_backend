const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('plan', {
  ref: 'Plan',
  localField: '_id',
  foreignField: 'trip'
});

schema.statics.findByIdWithWeather = async function(id) {
  const trip = await this
    .findById(id)
    .populate('plan');

  const plan = await Promise.all(trip.plan.map(plan => plan.getWeather()));

  return {
    ...trip.toJSON(),
    plan
  };
};

module.exports = mongoose.model('Trip', schema);
