import express from 'express';
import Authorization, { Authentication } from '../middlewares';
import { Menu } from '../controllers';
import { MenuValidations } from '../validations';

const router = express.Router();

// @route POST '/api/v1/menu'
// @desc Add new food menu item
// @access Private
router.post('/', Authentication.authenticated, Authorization.isAdmin, MenuValidations.post, Menu.post);

// @route GET '/api/v1/menu'
// @desc Get all the food item
// @access Public
router.get('/', Menu.get);

export default router;
