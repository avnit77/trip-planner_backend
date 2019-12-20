// const mongoose = require('mongoose');
const Plan = require('./Plan');

describe('Plan model', () => {
  it('has a required tripId', () => {
    const plan = new Plan();
    const { errors } = plan.validateSync();

    expect(errors.trip.message).toEqual('Path `trip` is required.');
  });

  it('has a required activity', () => {
    const plan = new Plan();
    const { errors } = plan.validateSync();

    expect(errors.activity.message).toEqual('Path `activity` is required.');
  });

});
