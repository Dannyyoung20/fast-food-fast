import chai from 'chai';
import request from 'supertest';
import server from '../server';
import { LOGIN_SUCCESS_MSG, INVALID_EMAIL_MSG, INVALID_EMAIL_PASSWORD_MSG, SUCCESSFUL_CREATED_MSG, UNIQUE_VIOLATION_MSG } from '../helpers';

const { expect } = chai;
const app = request.agent(server);
const authRoute = '/api/v1/auth';
const user = {
  email: 'admin@gmail.com',
  password: 'password',
};

describe('LOGIN TEST', () => {
  it('should login a valid user', (done) => {
    app
      .post(`${authRoute}/login`)
      .send(user)
      .end((err, response) => {
        expect(200);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(LOGIN_SUCCESS_MSG);
        done();
      });
  });

  it('should return 400 when invalid email is passed', (done) => {
    app
      .post(`${authRoute}/login`)
      .send({ email: 'fake@gmail.com', password: 'password' })
      .end((err, response) => {
        expect(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(INVALID_EMAIL_MSG);
        done();
      });
  });

  it('should return invalid email and password when wrong password is passed', (done) => {
    app
      .post(`${authRoute}/login`)
      .send({ email: 'admin@gmail.com', password: 'fakePassword' })
      .end((err, response) => {
        expect(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(INVALID_EMAIL_PASSWORD_MSG);
        done();
      });
  });
});

describe('SIGNUP TEST', () => {
  it('should return 201 after creating a new user', (done) => {
    app
      .post(`${authRoute}/signup`)
      .send({ email: 'new@gmail.com', password: 'password', address: 'Around Africa' })
      .end((err, response) => {
        expect(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(SUCCESSFUL_CREATED_MSG);
        done();
      });
  });

  it('should return 400 after sending duplicate email address', (done) => {
    app
      .post(`${authRoute}/signup`)
      .send({ email: 'admin@gmail.com', password: 'password', address: 'Around Africa' })
      .end((err, response) => {
        expect(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal(UNIQUE_VIOLATION_MSG);
        done();
      });
  });
});
