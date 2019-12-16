const Trip = require('./Trip');

describe('Trip model', () => {
  it('has a required name', () => {
    const itineraryItem = new Trip();
    const { errors } = itineraryItem.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required lat', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.lat.message).toEqual('Path `lat` is required.');
  });

  it('has a required long', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.long.message).toEqual('Path `long` is required.');
  });

});

