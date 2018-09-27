import request from 'supertest';
import app from '../server';

describe('api get route /api/v1/user/<orderID>/orders', () => {
  it('should return 200 ', (done) => {
    request(app).get('/api/v1/user/1/orders')
      .expect(200, done);
  });
}); 