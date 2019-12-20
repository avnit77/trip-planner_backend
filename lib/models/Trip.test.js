const Trip = require('./Trip');

describe('Trip model', () => {
  it('has a required name', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });


});

