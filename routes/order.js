import express from 'express';
import { isEmpty } from '../helpers';
import Store from '../store';
import db from '../db';

const router = express.Router();

// Creating an instance of the store class
const store = new Store();

// @route GET /api/v1/orders
// @desc List out all the orders
// @access Public
router.get('/', (req, res) => {
  const orders = store.showAllOrders();
  // db.selectAll('orders', (err, result) => {
  //   // const response = result.row[0];
  //   // Check if any orders exist
  //   // if (isEmpty(orders)) return res.status(200).json({ message: 'No orders at the moment' });
  //   return res.status(200).json(result);
  // });
  if (isEmpty(orders)) return res.status(200).json({ message: 'No orders at the moment' });
  return res.status(200).json(orders);
});

// @route POST /api/v1/orders
// @desc Saves the various orders that are sent
// @access Public
router.post('/', (req, res) => {
  // Check if the req.body is empty
  if (isEmpty(req.body)) return res.status(400).send('No data was passed');
  // Send the req.body to our Store class
  const data = store.storeOrder(req.body);
  // Respond with a status code of 201 if successfully created
  return res.status(201).json(data);
});

// @route GET /api/v1/orders/orderID
// @desc Displays a specific order
// @access Public
router.get('/:orderID', (req, res) => {
  // Destructing the req.params into orderID
  const { orderID } = req.params;
  const data = store.showSpecificOrder(orderID);
  if (isEmpty(data)) return res.status(404).json({ message: 'Order could not be found' });

  return res.status(200).json(data);
});

// @route PUT /api/v1/orders/orderID
// @desc Update a specific order
// @access Public
router.put('/:orderID', (req, res) => {
  // Destructing the req.params into orderID
  const { orderID } = req.params;
  // Calling the fn updateSpecificOrder and setting the return to data
  const data = store.updateSpecificOrder(orderID, req.body);
  if (isEmpty(data)) return res.status(404).json({ message: 'Order does not exist' });
  return res.status(201).json(data);
});

// @route DELETE /api/v1/orders/orderID
// @desc Delete a specific order
// @access Public
router.delete('/:orderID', (req, res) => {
  // Destructing the req.params into orderID
  const { orderID } = req.params;
  // Calling the fn updateSpecificOrder and setting the return to data
  store.deleteSpecificOrder(orderID);
  return res.status(200).json({ message: 'Order has been deleted' });
});

export default router;
