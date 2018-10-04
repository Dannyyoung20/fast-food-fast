import pool from '../db/connection';
import {
  errorHandler,
  NO_USER_MSG,
  SUCCESSFUL_REQUEST_MSG,
  tokenVerify,
} from '../helpers';

// Connecting to DB
pool.connect();

class User {
  static myOrderHistory(req, res) {
    const token = req.headers['x-access'] || req.headers.token;
    const decoded = tokenVerify(token);
    const { id } = decoded.user;
    const query = `SELECT * FROM orders WHERE id = ${id}`;
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) return res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG, history: 'No order history' });
        return res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG, history: result.rows });
      })
      .catch((e) => {
        errorHandler(res, e, 'Unknown Error');
      });
  }

  static handleResponse(res, result) {
    if (result.rowCount === 0) return res.status(404).json({ message: NO_USER_MSG });
    return result.rows[0].id;
  }
}

export default User;
