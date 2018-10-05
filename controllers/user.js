import pool from '../db/connection';
import {
  errorHandler,
  NO_USER_MSG,
  SUCCESSFUL_REQUEST_MSG,
} from '../helpers';

// Connecting to DB
pool.connect();

class User {
  static myOrderHistory(req, res) {
    const { id } = req.user;
    const query = 'SELECT * FROM orders WHERE id = $1';
    pool.query(query, [id])
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
