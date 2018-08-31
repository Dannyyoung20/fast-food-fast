import express from 'express';
import _ from 'lodash';
import uniqid from 'uniqid';
import store from '../store';

const router = express.Router();


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
  if (_.isEmpty(req.body)) return res.status(400).send('No data was passed');

  // Generate an id for the particular order
  const id = uniqid();

  // Construct a db Object for the order
  const order = {
    user: {
      name: req.body.name,
      address: req.body.address,
    },
    order: {
      id,
      item: req.body.item,
      price: req.body.price,
      size: req.body.size,
      quantity: req.body.quantity,
      toppings: req.body.toppings,
    },
  };

  // Store the order details in our store
  store.push(order);
  return res.status(201).json(store);
});

export default router;
