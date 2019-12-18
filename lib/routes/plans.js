const { Router } = require('express');
const Plan = require('../models/Plan');


module.exports = Router()
  .post('/', (req, res) => {
    Plan
      .create(req.body)
      .then(trip => res.send(trip));
  })

  .delete('/:id', (req, res) => {
    Plan
      .findByIdAndDelete(req.params.id)
      .then(([trip]) => res.send(trip));
  });
