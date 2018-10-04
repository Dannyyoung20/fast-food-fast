import pool from '../db/connection';
import generator, {
  errorHandler,
  NO_ORDER_MSG,
  NOT_FOUND_MSG,
  SUCCESSFUL_REQUEST_MSG,
  SUCCESSFUL_CREATED_MSG,
  FAILED_CREATED_MSG,
  tokenVerify,
  SERVER_ERROR_MSG,
} from '../helpers';

const ACCEPTED_STATUS = ['processing', 'cancelled', 'completed'];

class Order {
  static showAllOrders(req, res) {
    const query = 'SELECT * FROM orders';
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) return res.status(200).json({ message: NO_ORDER_MSG });
        return res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG, orders: result.rows });
      })
      .catch((e) => {
        errorHandler(res, e, NOT_FOUND_MSG, 404);
      });
  }

  static getSpecificOrder(req, res) {
    const { orderID } = req.params;
    const query = `SELECT * FROM orders WHERE slug = '${orderID}'`;
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) return res.status(404).json({ message: NOT_FOUND_MSG });
        return res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG, order: result.rows });
      })
      .catch((e) => {
        errorHandler(res, e, NOT_FOUND_MSG, 404);
      });
  }

  static updateSpecificOrder(req, res) {
    const { orderID } = req.params;
    const { status } = req.body;
    const isInArray = ACCEPTED_STATUS.findIndex(ele => ele === status);
    if (isInArray === -1) {
      return res.status(400).json({ message: 'Invalid Status Provided' });
    }
    const query = `UPDATE orders SET status = '${status}' WHERE slug = '${orderID}' RETURNING *`;
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) return res.status(404).json({ message: NOT_FOUND_MSG });
        return res.status(202).json({ message: SUCCESSFUL_REQUEST_MSG, order: result.rows });
      })
      .catch((e) => {
        errorHandler(res, e, NOT_FOUND_MSG, 404);
      });
    return false;
  }

  static deleteSpecificOrder(req, res) {
    const { orderID } = req.params;
    const query = `DELETE FROM orders WHERE slug = '${orderID}'`;
    pool.query(query)
      .then(() => {
        res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG });
      })
      .catch((e) => {
        errorHandler(res, e, NOT_FOUND_MSG, 404);
      });
  }

  static getMenuID(res, mealName) {
    const query = `SELECT id FROM menu WHERE name = '${mealName}'`;
    pool.query(query)
      .then((result) => {
        if (res.rowCount === 0) {
          res.status(400).json({ message: 'Meal does not exist' });
        }
        return result.rows[0].id;
      })
      .catch((e) => {
        ErrorHandler(res, e, SERVER_ERROR_MSG, 500);
      });
  }

  static placeOrder(req, res) {
    const { mealName, qty, address } = req.body;
    const slug = generator();

    const menuID = Order.getMenuID(res, mealName);

    // Getting the user id from our token variable
    const token = req.headers['x-access'] || req.headers.token;
    const decoded = tokenVerify(token);
    const userID = decoded.user.id;

    const query = 'INSERT INTO orders(menu_id, qty, delivery_address, slug, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
    pool.query(query, [menuID, qty, address, slug, userID])
      .then((result) => {
        res.status(201).json({ message: SUCCESSFUL_CREATED_MSG, order: result.rows[0] });
      })
      .catch((e) => {
        errorHandler(res, e, FAILED_CREATED_MSG, 400);
      });
  }
}

export default Order;
