import { tokenVerify, AUTH_MESSAGE } from '../helpers';
import pool from '../db/connection';


class Authorization {
  static checkTokenExistance(res, token) {
    if (!token || token === '') {
      return res.status(401).json({ message: AUTH_MESSAGE });
    }
    return true;
  }

  static isAdmin(req, res, next) {
    const token = req.headers['x-access'] || req.headers.token;
    Authorization.checkTokenExistance(res, token);
    const decoded = tokenVerify(token);
    const { id } = decoded.user;
    const query = 'SELECT role FROM users WHERE id = $1';
    pool.query(query, [id])
      .then((result) => {
        const roleId = result.rows[0].role;
        if (roleId !== 1) return res.status(401).json({ message: AUTH_MESSAGE });
        return next();
      })
      .catch((e) => { next(e); });
  }
}

export default Authorization;
