import pool from '../db/connection';
import {
  errorHandler,
  UNIQUE_VIOLATION_MSG,
} from '../helpers';

// Connecting to DB
pool.connect();

const SUCCESSFUL_MENU_MSG = 'Successfully created menu item';


// Menu controller class
class Menu {
  // @params req REQUEST, res RESPONSE
  // desc Add menu item to DB
  // @return null
  static post(req, res) {
    const { imageUrl, name, price } = req.body;
    const integerPrice = parseInt(price, 10);

    const query = 'INSERT INTO menu(name, price, img) VALUES ($1, $2, $3) RETURNING *';
    pool.query(query, [name.toLowerCase(), integerPrice, imageUrl])
      .then((result) => {
        Menu.handleResponse(res, result.rows[0], SUCCESSFUL_MENU_MSG, 201);
      })
      .catch((e) => {
        errorHandler(res, e, UNIQUE_VIOLATION_MSG);
      });
  }

  // @params res RESPONSE, result DB_ROW, status Status Code
  // @desc Handle our query response
  // @return item
  static handleResponse(res, result, message, status = 200) {
    return res.status(status).json({ message, menu: result });
  }

  // @params req REQUEST, res RESPONSE
  // @desc Gets all the menu items
  // @return [items]
  static get(req, res) {
    const query = 'SELECT * FROM menu';
    pool.query(query)
      .then((result) => { Menu.handleResponse(res, result.rows, SUCCESSFUL_MENU_MSG); })
      .catch((e) => { errorHandler(res, e, 'Request was not processed. Try again later'); });
  }
}

export default Menu;
