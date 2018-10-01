import pool from '../db/connection';
import {
  ErrorHandler,
  NO_USER_MSG,
  SUCCESSFUL_REQUEST_MSG,
} from '../helpers';

// Connecting to DB
pool.connect();

class User {
  static getUserID(res, slug) {
    const query = `SELECT id FROM users where slug = ${slug}`;
    pool.query(query)
      .then((result) => {
        User.handleResponse(res, result);
      })
      .catch((e) => {
        ErrorHandler(res, e, NO_USER_MSG, 404);
      });
  }

  static myOrderHistory(req, res) {
    const { userID } = req.params;
    const id = User.getUserID(userID);
    const query = `SELECT * FROM orders WHERE id = ${id}`;

    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) return res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG, history: 'No order history' });
        return res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG, history: result.rows });
      })
      .catch((e) => {
        ErrorHandler(res, e, 'Unknown Error');
      });
  }

  static handleResponse(res, result) {
    if (result.rowCount === 0) return res.status(404).json({ message: NO_USER_MSG });
    return result.rows[0].id;
  }
}

export default User;
