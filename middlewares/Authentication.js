import {
  tokenVerify, TOKEN_NOT_PASSED_MSG, TOKEN_INVALID_MSG, AUTH_MESSAGE,
} from '../helpers';
import pool from '../db/connection';

class Authentication {
  static async authenticated(req, res, next) {
    // Getting the user id from our token variable
    const token = req.headers['x-access'] || req.headers.token;
    if (!token) return res.status(400).json({ message: TOKEN_NOT_PASSED_MSG });
    try {
      const decoded = tokenVerify(token);

      const { id } = decoded.user;
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      if (result.rowCount === 0) throw new Error('User does not exist');
      const [user] = result.rows;
      req.user = user;

      return next();
    } catch (error) {
      return res.status(400).json({ message: TOKEN_INVALID_MSG, error: error.message });
    }
  }

  static isAdmin(req, res, next) {
    const { user } = req;
    if (user.role !== 1) return res.status(401).json({ message: AUTH_MESSAGE });
    return next();
  }
}

export default Authentication;
