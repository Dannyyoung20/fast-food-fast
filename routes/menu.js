import express from 'express';
import Authorization from '../middlewares';
import { Menu } from '../controllers';

const router = express.Router();

// @route POST '/api/v1/menu'
// @desc Add new food menu item
// @access Private
router.post('/', Authorization.isAdmin, Menu.post);

// @route GET '/api/v1/menu'
// @desc Get all the food item
// @access Public
router.get('/', Menu.get);

export default router;
