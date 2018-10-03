import chai from 'chai';
import request from 'supertest';
import server from '../server';


const { expect } = chai;
const app = request.agent(server);
const loginRoute = '/api/v1/auth/login';
const signupRoute = '/api/v1/auth/signup';
const menuRoute = '/api/v1/menu';
const user = {
  email: 'admin@gmail.com',
  password: 'password',
};

const postData = {
  name: 'Hot dog',
  price: 1000,
  imageUrl: 'hdada',
};

let slug;
let token;
let rToken; // r -> regular

describe('MENU TEST', () => {
  before((done) => {
    app
      .post(loginRoute)
      .send(user)
      .end((err, response) => {
        const jwtToken = response.body.token;
        token = jwtToken;
        done();
      });
  });

  it('should return 200 and all the menu food items', (done) => {
    app
      .get(menuRoute)
      .end((err, response) => {
        expect(200);
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('menu');
        expect(response.body.message).to.equal('Successfully created menu item');
        done();
      });
  });

  it('should return 201 when add new menu item', (done) => {
    app
      .post(menuRoute)
      .set('token', token)
      .send(postData)
      .end((err, response) => {
        expect(201);
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('menu');
        expect(response.body.message).to.equal('Successfully created menu item');
        done();
      });
  });
});
