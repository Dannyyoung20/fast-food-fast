import express from 'express';
import Authorization from '../middlewares';
import { Order } from '../controllers';

const router = express.Router();


// @route GET /api/v1/orders
// @desc List out all the orders
// @access Public
router.get('/', Authorization.isAdmin, Order.showAllOrders);

// @route POST /api/v1/orders
// @desc Saves the various orders that are sent
// @access Public
router.post('/', Order.placeOrder);

// @route GET /api/v1/orders/orderID
// @desc Displays a specific order
// @access Public
router.get('/:orderID', Authorization.isAdmin, Order.getSpecificOrder);

// @route PUT /api/v1/orders/orderID
// @desc Update a specific order
// @access Public
router.put('/:orderID', Authorization.isAdmin, Order.updateSpecificOrder);

// @route DELETE /api/v1/orders/orderID
// @desc Delete a specific order
// @access Public
router.delete('/:orderID', Authorization.isAdmin, Order.deleteSpecificOrder);

export default router;
