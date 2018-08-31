import uniqid from 'uniqid';

// Our Data Store for testing purposes
const store = [
  {
    user: {
      name: 'Daniel',
      address: 'Somewhere in Lagos',
    },
    order: {
      id: uniqid(),
      item: 'pizza',
      price: 3500,
      size: 'medium',
      quantity: 3,
      toppings: 'cheese',
    },
  },
];

export default store;
