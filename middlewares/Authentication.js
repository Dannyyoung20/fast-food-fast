import { tokenVerify, TOKEN_NOT_PASSED_MSG, TOKEN_INVALID_MSG } from '../helpers';

class Authentication {
  static authenticated(req, res, next) {
    // Getting the user id from our token variable
    const token = req.headers['x-access'] || req.headers.token;
    if (!token) return res.status(400).json({ message: TOKEN_NOT_PASSED_MSG });
    try {
      tokenVerify(token);
    } catch (e) {
      if (e) return res.status(400).json({ message: TOKEN_INVALID_MSG });
    }
    return next();
  }
}

export default Authentication;
