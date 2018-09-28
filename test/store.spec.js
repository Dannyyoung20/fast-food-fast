import request from 'supertest';
import { expect } from 'chai';
import app from '../server';

import Store from '../store';

describe('get api route', () => {
  const store = new Store();
  it('should be an instance of Store', (done) => {
    [store].forEach((order) => {
      expect(order).be.an.instanceOf(Store);
    });
    done();
  });

  it('should be an instance of Array', (done) => {
    [store].forEach((order) => {
      expect(order.showAllOrders()).be.an.instanceOf(Array);
    });
    done();
  });

  it('showAllOrders should be a Function', (done) => {
    [store].forEach((order) => {
      expect(order.showAllOrders).be.a('function');
    });
    done();
  });

  it('showAllOrders should be have an item', (done) => {
    [store].forEach((order) => {
      expect(order.showAllOrders()).have.length(1);
    });
    done();
  });

  it('showSpecificOrder should be a Function', (done) => {
    [store].forEach((order) => {
      expect(order.showSpecificOrder).be.a('function');
    });
    done();
  });
});
