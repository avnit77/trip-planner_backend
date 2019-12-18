require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const Plan = require('../lib/models/Plan');

describe('plan routes', () => {
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
      }
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an plan', () => {
    return request(app)
      .post('/api/v1/plans')
      .send({
        tripId: trip._id,
        activity: 'bowling'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          activity: 'bowling',
          __v: 0
        });
      });
  });

  it('deletes a plan by id', async() => {
    return request(app)
      .delete(`/api/v1/plans/${plan._id}`)
      .then(() => {
        return Plan.find();
      })
      .then(plan => {
        expect(plan).toHaveLength(0);
      });
  });
});
