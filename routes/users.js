import express from 'express';
import { User } from '../controllers';
import { Authentication } from '../middlewares';

const router = express.Router();

// @route GET /api/v1/users/<userID>/orders
// @desc List out all the previous order for this user
// @access Public
router.get('/:userID/orders', Authentication.authenticated, User.myOrderHistory);

// @route GET /api/v1/users/me
// @desc List out all the previous order for this user
// @access Public
router.get('/me', Authentication.authenticated, User.myDetails);

export default router;
