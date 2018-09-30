import express from 'express';
import Authentication from '../controllers';

const router = express.Router();

// @route POST /api/v1/auth/signup
// @desc Signup a user
// @access Public
router.post('/signup', Authentication.signup);
router.post('/login', Authentication.login);

export default router;
