import express from 'express';
import Authorization, { Authentication } from '../middlewares';
import { Order } from '../controllers';

const router = express.Router();


// @route GET /api/v1/orders
// @desc List out all the orders
// @access Public
router.get('/', Authentication.authenticated, Authorization.isAdmin, Order.showAllOrders);

// @route POST /api/v1/orders
// @desc Saves the various orders that are sent
// @access Public
router.post('/', Authentication.authenticated, Order.placeOrder);

// @route GET /api/v1/orders/orderID
// @desc Displays a specific order
// @access Public
router.get('/:orderID', Authentication.authenticated, Authorization.isAdmin, Order.getSpecificOrder);

// @route PUT /api/v1/orders/orderID
// @desc Update a specific order
// @access Public
router.put('/:orderID', Authentication.authenticated, Authorization.isAdmin, Order.updateSpecificOrder);

// @route DELETE /api/v1/orders/orderID
// @desc Delete a specific order
// @access Public
router.delete('/:orderID', Authentication.authenticated, Authorization.isAdmin, Order.deleteSpecificOrder);

export default router;
