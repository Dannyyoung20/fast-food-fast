import chai from 'chai';
import request from 'supertest';
import server from '../server';
import { SUCCESSFUL_REQUEST_MSG, NO_USER_MSG } from '../helpers';

const { expect } = chai;
const app = request.agent(server);
const loginRoute = '/api/v1/auth/login';
const ordersRoute = '/api/v1/orders';
const userRoute = '/api/v1/users';
const user = {
  email: 'admin@gmail.com',
  password: 'password',
};

const secondData = {
  menuID: 1,
  address: 'Africa',
  qty: 10,
};


let slug;
let token;

before((done) => {
  app
    .post(`${loginRoute}`)
    .send(user)
    .end((err, response) => {
      const jwtToken = response.body.token;
      token = jwtToken;
      done();
    });
});
describe('USER TEST', () => {
  before((done) => {
    app
      .post(`${ordersRoute}`)
      .set('token', token)
      .send(secondData)
      .end((err, response) => {
        const dbSlug = response.body.order.slug;
        slug = dbSlug;
        done();
      });
  });

  it('should return users order history', (done) => {
    app
      .get(`${userRoute}/${slug}/orders`)
      .set('token', token)
      .end((err, response) => {
        expect(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('history');
        expect(response.body.message).to.equal(SUCCESSFUL_REQUEST_MSG);
        done();
      });
  });
});
