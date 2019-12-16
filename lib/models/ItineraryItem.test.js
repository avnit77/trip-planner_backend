// const mongoose = require('mongoose');
const ItineraryItem = require('./ItineraryItem');

describe('Itinerary model', () => {
  it('has a required tripId', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.tripId.message).toEqual('Path `tripId` is required.');
  });

  it('has a required activity', () => {
    const itineraryItem = new ItineraryItem();
    const { errors } = itineraryItem.validateSync();

    expect(errors.activity.message).toEqual('Path `activity` is required.');
  });

});
