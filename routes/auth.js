import express from 'express';
import Authentication from '../controllers';
import Validations from '../validations/auth';

const router = express.Router();

// @route POST /api/v1/auth/signup
// @desc Signup a user
// @access Public
router.post('/signup', Validations.signup, Authentication.signup);
router.post('/login', Validations.login, Authentication.login);

export default router;
