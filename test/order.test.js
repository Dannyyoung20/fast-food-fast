import request from 'supertest';
import app from '../server';

describe('get api route', () => {
  it('should exist /api/v1/orders route', (done) => {
    request(app).get('/api/v1/orders')
      .expect(200, done);
  });

  it('should exist /api/v1/orders/<orderID> route', (done) => {
    request(app).get('/api/v1/orders/1')
      .expect(404, done);
  });
});

describe('post api route', () => {
  it('should exist /api/v1/orders route', (done) => {
    request(app).post('/api/v1/orders')
      .type('form')
      .send({ name: 'jdoajd' })
      .expect(201, done);
  });
});

describe('delte api route', () => {
  it('should exist /api/v1/orders route', (done) => {
    request(app).delete('/api/v1/orders/1')
      .type('form')
      .send({ name: 'jdoajd' })
      .expect(200, done);
  });
});

describe('put api route', () => {
  it('should exist /api/v1/orders route', (done) => {
    request(app).put('/api/v1/orders')
      .expect(404, done);
  });
});
