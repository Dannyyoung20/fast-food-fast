import chai from 'chai';
import request from 'supertest';
import server from '../server';
import {
  NO_ORDER_MSG,
  SUCCESSFUL_CREATED_MSG,
  SUCCESSFUL_REQUEST_MSG,
  FAILED_CREATED_MSG,
  NOT_FOUND_MSG,
  AUTH_MESSAGE,
  TOKEN_NOT_PASSED_MSG,
  TOKEN_INVALID_MSG,
} from '../helpers';

const { expect } = chai;
const app = request.agent(server);
const loginRoute = '/api/v1/auth/login';
const signupRoute = '/api/v1/auth/signup';
const ordersRoute = '/api/v1/orders';
const user = {
  email: 'admin@gmail.com',
  password: 'password',
};

const postData = {
  mealName: 'pizza',
  address: 'somewhere',
  qty: 3,
};

const secondData = {
  mealName: 'pizza',
  address: 'Around Africa djkadakjda',
  qty: 10,
};


let slug;
let token;
let rToken; // r -> regular

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
        const dbSlug = response.body.order.item.slug;
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
      .send({ mealName: 'pizza', address: 'somewhere in the world' })
      .end((err, response) => {
        expect(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(FAILED_CREATED_MSG);
        done();
      });
  });

  it('should return 400 Bad Request error when invalid token is passed', (done) => {
    app
      .post(ordersRoute)
      .set('token', 'fakeToken')
      .send(secondData)
      .end((err, response) => {
        expect(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(TOKEN_INVALID_MSG);
        done();
      });
  });

  it('should return 400 Bad Request error when no token is passed', (done) => {
    app
      .post(ordersRoute)
      .send({ mealName: 'pizza', address: 'jdadhaah' })
      .end((err, response) => {
        expect(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(TOKEN_NOT_PASSED_MSG);
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
      .send({ status: 'processing' })
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
      .send({ status: 'processing' })
      .end((err, response) => {
        expect(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(NOT_FOUND_MSG);
        done();
      });
  });

  it('should 400 when sending an invalid staus', (done) => {
    app
      .put(`${ordersRoute}/invalid`)
      .set('token', token)
      .send({ status: 'delivering' })
      .end((err, response) => {
        expect(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Invalid Status Provided');
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

describe('AUTHORIZATION TEST', () => {
  before((done) => {
    app
      .post(signupRoute)
      .send({ email: 'test@gmail.com', password: 'password', address: 'somewhere in the world' })
      .end((err, response) => {
        const jwtToken = response.body.token;
        rToken = jwtToken;
        done();
      });
  });

  it('should return 401 with Auth message when trying to access orders route with regular token', (done) => {
    app
      .get(ordersRoute)
      .set('token', rToken)
      .end((err, response) => {
        expect(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(AUTH_MESSAGE);
        done();
      });
  });

  it('should return 401 error with Auth message when trying to update orders route with regualar token', (done) => {
    app
      .put(`${ordersRoute}/${slug}`)
      .set('token', rToken)
      .send({ status: 'processing' })
      .end((err, response) => {
        expect(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(AUTH_MESSAGE);
        done();
      });
  });

  it('should return 401 error with Auth message when trying to get a specific order', (done) => {
    app
      .get(`${ordersRoute}/${slug}`)
      .set('token', rToken)
      .end((err, response) => {
        expect(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(AUTH_MESSAGE);
        done();
      });
  });
});
