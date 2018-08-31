import express from 'express';
import _ from 'lodash';

const router = express.Router();


// Our Data Store
const store = [
  {
    name: 'Daniel',
    age: 21,
  },
];

// @route GET /api/v1/orders
// @desc List out all the orders
// @access Public
router.get('/', (req, res, next) => {
  res.send('Hello from api');
  next();
});

// @route POST /api/v1/orders
// @desc Saves the various orders that are sent
// @access Public
router.post('/', (req, res) => {
  // Check if the req.body is empty
  if (!req.body) return res.status(400).send('No data was passed');

  // Verify if the order already exists
  const verify = _.find(store, user => user.name === req.body.name);
  if (verify) return res.status(400).send('User exist');

  // Store the order details in our store
  store.push(req.body);
  return res.status(201).json(store);
});

export default router;
