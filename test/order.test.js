import chai from 'chai';
import request from 'supertest';
import server from '../server';
import {
  NO_ORDER_MSG,
  SUCCESSFUL_CREATED_MSG,
  SUCCESSFUL_REQUEST_MSG,
  FAILED_CREATED_MSG,
  NOT_FOUND_MSG,
} from '../helpers';

const { expect } = chai;
const app = request.agent(server);
const loginRoute = '/api/v1/auth/login';
const ordersRoute = '/api/v1/orders';
const user = {
  email: 'admin@gmail.com',
  password: 'password',
};

const postData = {
  menuID: 1,
  address: 'somewhere',
  qty: 3,
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
    .post(loginRoute)
    .send(user)
    .end((err, response) => {
      expect(200);
      const jwtToken = response.body.token;
      token = jwtToken;
      done();
    });
});

describe('GET api orders route', () => {
  it('should return a 404 error when no order is found', (done) => {
    app
      .get(ordersRoute)
      .set('token', token)
      .end((err, response) => {
        expect(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(NO_ORDER_MSG);
        done();
      });
  });
});

describe('POST api orders route', () => {
  before((done) => {
    app
      .post(ordersRoute)
      .set('token', token)
      .send(postData)
      .end((err, response) => {
        const dbSlug = response.body.order.slug;
        slug = dbSlug;
        done();
      });
  });

  it('should return a list of all available orders', (done) => {
    app
      .get(ordersRoute)
      .set('token', token)
      .end((err, response) => {
        expect(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('orders');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(SUCCESSFUL_REQUEST_MSG);
        done();
      });
  });

  it('should return a 200 successfully created', (done) => {
    app
      .post(ordersRoute)
      .set('token', token)
      .send(secondData)
      .end((err, response) => {
        expect(201);
        expect(response.body.message).to.equal(SUCCESSFUL_CREATED_MSG);
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('order');
        done();
      });
  });

  it('should return 400 Bad Request error when all required data aren\'t passed', (done) => {
    app
      .post(ordersRoute)
      .set('token', token)
      .send({ menuID: 1, address: 'jdadhaah' })
      .end((err, response) => {
        expect(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(FAILED_CREATED_MSG);
        done();
      });
  });
});

describe('GET specific order api route', () => {
  it('should return 200 when getting a specific existing order', (done) => {
    app
      .get(`${ordersRoute}/${slug}`)
      .set('token', token)
      .end((err, response) => {
        expect(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('order');
        expect(response.body.message).to.equal(SUCCESSFUL_REQUEST_MSG);
        done();
      });
  });

  it('should return 404 when sending invalid slug id', (done) => {
    app
      .get(`${ordersRoute}/slug`)
      .set('token', token)
      .end((err, response) => {
        expect(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(NOT_FOUND_MSG);
        done();
      });
  });
});

describe('PUT orders api route', () => {
  it('should return 202 after updating the status of an order', (done) => {
    app
      .put(`${ordersRoute}/${slug}`)
      .set('token', token)
      .send({ status: 'delivering' })
      .end((err, response) => {
        expect(202);
        expect(response.body).to.have.property('order');
        expect(response.body).to.have.property('message');
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal(SUCCESSFUL_REQUEST_MSG);
        done();
      });
  });

  it('should 404 when using an invalid slug id', (done) => {
    app
      .put(`${ordersRoute}/invalid`)
      .set('token', token)
      .send({ status: 'delivering' })
      .end((err, response) => {
        expect(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(NOT_FOUND_MSG);
        done();
      });
  });
});

describe('DELETE orders api route', () => {
  it('should return 200 after successfully deleting an order', (done) => {
    app
      .delete(`${ordersRoute}/${slug}`)
      .set('token', token)
      .end((err, response) => {
        expect(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(SUCCESSFUL_REQUEST_MSG);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
