import { tokenVerify, AUTH_MESSAGE } from '../helpers';


class Authorization {
  // @desc Verifies a token
  // @params token JWT_TOKEN
  // @return Object
  static JWT_VERIFY(token) {
    return tokenVerify(token);
  }

  static isAdmin(req, res, next) {
    const token = req.headers['x-access'] || req.headers.token;
    if (!token || token === '') return res.status(401).json({ message: AUTH_MESSAGE });
    const decoded = Authorization.JWT_VERIFY(token);
    if (decoded.user.isAdmin !== 1) return res.status(401).json({ message: AUTH_MESSAGE });
    return next();
  }
}

export default Authorization;
