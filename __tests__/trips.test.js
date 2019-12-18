require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const Plan = require('../lib/models/Plan');

// jest.mock('../lib/services/futurama.js', () => ({
//   getQuote() {
//     return Promise.resolve('My futurama quote');
//   }
// }));

// jest.mock('../lib/services/simpsons.js', () => ({
//   getQuote() {
//     return Promise.resolve('My simpsons quote');
//   }
// }));

describe('trip routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let plan;
  beforeEach(async() => {
    trip = await Trip.create({
      name: 'Mexico',
      lat: 17.063220,
      long: -96.744523
    });

    plan = await Plan.create([
      {
        tripId: trip._id,
        activity: 'bowling'
      },
      {
        tripId: trip._id,
        activity: 'fancy dinner'
      },
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'Mexico',
        lat: 17.063220,
        long: -96.744523
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mexico',
          lat: 17.063220,
          long: -96.744523,
          __v: 0
        });
      });
  });

  it('gets all trips', async() => {
    const trips = await Trip.create([
      { name: 'Mexico', lat: 123, long: 456 },
      { name: 'Canada', lat: 123, long: 456 },
      { name: 'Israel', lat: 123, long: 456 }
    ]);

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.toString(),
            name: trip.name,
            lat: 123,
            long: 456,
            __v: 0
          });
        });
      });
  });

  it('gets a trip by id', async() => {
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: expect.any(String),
          name: 'Mexico',
          lat: 17.063220,
          long: -96.744523,
          plan: JSON.parse(JSON.stringify(plan)),
          __v: 0
        });
      });
  });

  it('updates a trip by id', async() => {
    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ name: 'New Mexico' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'New Mexico',
          lat: 17.063220,
          long: -96.744523,
          __v: 0
        });
      });
  });

  it('deletes a trip by id', async() => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Mexico',
          lat: 17.063220,
          long: -96.744523,
          __v: 0
        });

        return Plan.find();
      })
      .then(plan => {
        expect(plan).toHaveLength(0);
      });
  });
});
