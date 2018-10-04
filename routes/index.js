import { Router } from 'express';

import Auth from './auth';
import Menu from './menu';
import Order from './order';
import User from './users';

const router = Router();

router.use('/api/v1/auth', Auth);
router.use('/api/v1/menu/', Menu);
router.use('/api/v1/orders/', Order);
router.use('/api/v1/users/', User);
router.get('/', (req, res) => { res.status(200).json({ message: 'Welcome to Fast Food ' }); });

export default router;
