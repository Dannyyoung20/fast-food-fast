import express from 'express';
import _ from 'lodash';
import Store from '../store';

const router = express.Router();

const store = new Store();

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
  // Send the req.body to our Store class
  const data = store.storeOrder(req.body);
  // Respond with a status code of 201 if successfully created
  return res.status(201).json(data);
});

export default router;
