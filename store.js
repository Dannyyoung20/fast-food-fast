import uniqid from 'uniqid';

// // Our Data Store for testing purposes
// const store = [
//   {
//     user: {
//       name: 'Daniel',
//       address: 'Somewhere in Lagos',
//     },
//     order: {
//       id: uniqid(),
//       item: 'pizza',
//       price: 3500,
//       size: 'medium',
//       quantity: 3,
//       toppings: 'cheese',
//     },
//   },
// ];

class Store {
  constructor() {
    this.store = [];
  }

  // generate uniqe id for an order
  static generateUid() {
    return uniqid();
  }

  storeOrder(_body) {
    // Construct a db Object for the order
    const order = {
      user: {
        name: _body.name,
        address: _body.address,
      },
      order: {
        id: Store.generateUid(),
        item: _body.item,
        price: _body.price,
        size: _body.size,
        quantity: _body.quantity,
        toppings: _body.toppings,
      },
    };
    // Store the order details in our store
    this.store.push(order);
    return this.store;
  }

  showAllOrders() {
    return this.store;
  }
}

export default Store;
