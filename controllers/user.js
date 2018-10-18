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
    const query = `
      SELECT 
      orders.id, orders.qty, orders.delivery_address, orders.created_at, orders.status, orders.status, orders.slug, menu.img, menu.name, menu.price
      FROM orders
      INNER JOIN menu ON orders.menu_id = menu.id
      WHERE orders.user_id = $1
      ORDER BY id DESC;
      `;
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

  static async myDetails(req, res) {
    const { id } = req.user;
    const query = 'SELECT email, role, address FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) return res.status(400).json({ message: 'User does not exist' });
    return res.status(200).json({ user: result.rows });
  }
}

export default User;
