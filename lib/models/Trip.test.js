const Trip = require('./Trip');

describe('Trip model', () => {
  it('has a required name', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required lat', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.lat.message).toEqual('Path `lat` is required.');
  });

  it('has a required long', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();

    expect(errors.long.message).toEqual('Path `long` is required.');
  });

});

