import express from 'express';

const router = express.Router();

// @route GET /api/v1/users/<userID>/orders
// @desc List out all the previous order for this user
// @access Public
router.get('/:userID/orders', (req, res) => {
  const { userID } = req.params;
  return userID;
});

export default router;
