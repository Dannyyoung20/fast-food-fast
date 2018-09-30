import pool from '../db/connection';
import {
  ErrorHandler,
  UNIQUE_VIOLATION_MSG,
} from '../helpers';

// Connecting to DB
pool.connect();


// Menu controller class
class Menu {
  // @params req REQUEST, res RESPONSE
  // desc Add menu item to DB
  // @return null
  static post(req, res) {
    const { imageUrl, name, price } = req.body;

    const query = 'INSERT INTO menu(name, price, img) VALUES ($1, $2, $3) RETURNING *';
    pool.query(query, [name, price, imageUrl])
      .then((result) => {
        Menu.handleResponse(res, result.rows[0], 201);
      })
      .catch((e) => {
        ErrorHandler(res, e, UNIQUE_VIOLATION_MSG);
      });
    return false;
  }

  // @params res RESPONSE, result DB_ROW, status Status Code
  // @desc Handle our query response
  // @return item
  static handleResponse(res, result, status = 200) {
    return res.status(status).json({ message: 'Successfully created menu item', item: result });
  }

  // @params req REQUEST, res RESPONSE
  // @desc Gets all the menu items
  // @return [items]
  static get(req, res) {
    const query = 'SELECT * FROM menu';
    pool.query(query)
      .then((result) => { Menu.handleResponse(res, result.rows); })
      .catch((e) => { ErrorHandler(res, e, 'Request was not processed. Try again later'); });
  }
}

export default Menu;
