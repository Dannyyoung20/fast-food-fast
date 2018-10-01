import express from 'express';
import { User } from '../controllers';

const router = express.Router();

// @route GET /api/v1/users/<userID>/orders
// @desc List out all the previous order for this user
// @access Public
router.get('/:userID/orders', User.myOrderHistory);

export default router;
