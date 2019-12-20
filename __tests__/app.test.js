require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const Plan = require('../lib/models/Plan');

jest.mock('../lib/services/weather.js', () => ({
  getWoeid() {
    return Promise.resolve('12345');
  },
  getWeather() {
    return Promise.resolve({
      min_temp: 5
    });
  }
}));

describe('app routes', () => {
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
      name: 'Mexico'
    });

    plan = await Plan.create({
      trip: trip._id,
      startDate: new Date('2020-03-21'),
      woeid: '2487956',
      activity: 'Bowling'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({ name: 'Canada' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Canada',
          __v: 0
        });
      });
  });

  it('gets a trip by id', () => {
    return request(app)
      .get(`/api/v1/trips/${trip.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip.id,
          name: 'Mexico',
          plan: [{
            _id: plan.id,
            trip: trip.id,
            startDate: plan.startDate.toISOString(),
            temp: 5,
            activity: 'Bowling',
            woeid: '2487956',
            __v: 0
          }],
          __v: 0
        });
      });
  });

  it('gets all trips', () => {
    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        expect(res.body).toEqual([JSON.parse(JSON.stringify(trip))]);
      });
  });

  it('updates a trip', () => {
    return request(app)
      .patch(`/api/v1/trips/${trip.id}`)
      .send({ name: 'Canada Summer 2020' })
      .then(res => {
        expect(res.body.name).toEqual('Canada Summer 2020');
      });
  });

  it('deletes a trip', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip.id,
          name: 'Mexico',
          __v: 0
        });
      });
  });

  it('can add a plan', () => {
    return request(app)
      .post(`/api/v1/trips/${trip.id}/plan`)
      .send({
        startDate: new Date('2020-03-23'),
        activity: 'Eat',
        latitude: 37.777119,
        longitude: -122.41964
      })
      .then(res => {
        expect(res.body.plan).toContainEqual({
          _id: expect.any(String),
          trip: trip.id,
          startDate: '2020-03-23T00:00:00.000Z',
          activity: 'Eat',
          latitude: 37.777119,
          longitude: -122.41964,
          woeid: '12345',
          __v: 0
        });
      });
  });

  it('can delete a plan', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip.id}/plan/${plan.id}`)
      .then(res => {
        expect(res.body.plan).toHaveLength(0);
      });
  });
});
