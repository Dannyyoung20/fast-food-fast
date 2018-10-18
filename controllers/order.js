import pool from '../db/connection';
import generator, {
  errorHandler,
  NO_ORDER_MSG,
  NOT_FOUND_MSG,
  SUCCESSFUL_REQUEST_MSG,
  SUCCESSFUL_CREATED_MSG,
  FAILED_CREATED_MSG,
} from '../helpers';

class Order {
  static showAllOrders(req, res) {
    const query = `
      SELECT 
      orders.id, orders.qty, orders.delivery_address, orders.status, orders.slug, menu.img, menu.name, menu.price, users.email
      FROM orders 
      INNER JOIN users ON orders.user_id = users.id
      INNER JOIN menu ON orders.menu_id = menu.id
      ORDER BY id DESC;
      `;
    pool.query(query)
      .then(async (result) => {
        if (result.rowCount === 0) return res.status(200).json({ message: NO_ORDER_MSG });

        return res.status(200).json({
          message: SUCCESSFUL_REQUEST_MSG,
          orders: {
            items: result.rows,
          },
        });
      })
      .catch((e) => {
        errorHandler(res, e, NOT_FOUND_MSG, 404);
      });
  }

  static getSpecificOrder(req, res) {
    const { orderID } = req.params;
    const query = 'SELECT * FROM orders WHERE slug = $1';
    pool.query(query, [orderID])
      .then(async (result) => {
        if (result.rowCount === 0) return res.status(404).json({ message: NOT_FOUND_MSG });
        const menu = await Order.getMenuDetails(res, result.rows[0].menu_id);
        return res.status(200).json({
          message: SUCCESSFUL_REQUEST_MSG,
          order: {
            item: {
              name: menu.rows[0].name,
              price: menu.rows[0].price,
              quantity: result.rows[0].quantity,
              delivery_address: result.rows[0].delivery_address,
              status: result.rows[0].status,
              image: menu.rows[0].img,
              created_at: result.rows[0].created_at,
              user: {
                slug: req.user.slug,
              },
            },
          },
        });
      })
      .catch((e) => {
        errorHandler(res, e, NOT_FOUND_MSG, 404);
      });
  }

  static async getMenuDetails(res, menuID) {
    const query = 'SELECT * FROM menu WHERE id = $1';
    const result = await pool.query(query, [menuID]);
    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'Meal does not exist' });
    }
    return result;
  }

  static updateSpecificOrder(req, res) {
    const { orderID } = req.params;
    const { status } = req.body;
    const lowerCaseStatus = status.toLowerCase();

    const query = 'UPDATE orders SET status = $1 WHERE slug = $2 RETURNING *';
    pool.query(query, [lowerCaseStatus, orderID])
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
    const query = 'DELETE FROM orders WHERE slug = $1';
    pool.query(query, [orderID])
      .then(() => {
        res.status(200).json({ message: SUCCESSFUL_REQUEST_MSG });
      })
      .catch((e) => {
        errorHandler(res, e, NOT_FOUND_MSG, 404);
      });
  }

  static async getMenuID(res, mealName) {
    const query = 'SELECT id FROM menu WHERE name = $1';
    const lowerCaseMeal = mealName.toLowerCase();
    const result = await pool.query(query, [lowerCaseMeal]);
    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'Meal does not exist' });
    }
    return result.rows[0].id;
  }

  static async placeOrder(req, res) {
    const { mealName, qty } = req.body;
    const slug = generator();

    const menuID = await Order.getMenuID(res, mealName);

    const userID = req.user.id;
    const { address } = req.user;

    const query = 'INSERT INTO orders(menu_id, qty, delivery_address, slug, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
    pool.query(query, [menuID, qty, address, slug, userID])
      .then(async (result) => {
        const menu = await Order.getMenuDetails(res, result.rows[0].menu_id);
        return res.status(200).json({
          message: SUCCESSFUL_CREATED_MSG,
          order: {
            item: {
              name: menu.rows[0].name,
              price: menu.rows[0].price,
              quantity: result.rows[0].quantity,
              delivery_address: result.rows[0].delivery_address,
              status: result.rows[0].status,
              slug: result.rows[0].slug,
              image: menu.rows[0].img,
              created_at: result.rows[0].created_at,
              user: {
                slug: req.user.slug,
              },
            },
          },
        });
      })
      .catch((e) => {
        errorHandler(res, e, FAILED_CREATED_MSG, 400);
      });
  }
}

export default Order;
