const { Router } = require('express');
const Trip = require('../models/Trip');
const Plan = require('../models/Plan');

module.exports = Router()
  .post('/', (req, res) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip));
  })

  .get('/', (req, res) => {
    Trip
      .find()
      .then(trips => res.send(trips));
  })

  .get('/:id', (req, res) => {
    Trip
      .findById(req.params.id)
      .populate('Plan')
      .then(trips => res.send(trips));
  })

  .patch('/:id', (req, res) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip));
  })

  .delete('/:id', (req, res) => {
    Promise.all([
      Trip.findByIdAndDelete(req.params.id),
      Plan.deleteMany({ tripId: req.params.id })
    ])
      .then(([trip]) => res.send(trip));
  });
