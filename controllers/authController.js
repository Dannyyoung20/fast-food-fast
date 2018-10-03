import generator, {
  hashPassword,
  tokenGenerate,
  verifyPassword,
  ErrorHandler,
  UNIQUE_VIOLATION_MSG,
  LOGIN_SUCCESS_MSG,
  INVALID_EMAIL_MSG,
  INVALID_EMAIL_PASSWORD_MSG,
  SERVER_ERROR_MSG,
  SUCCESSFUL_CREATED_MSG,
} from '../helpers';
import pool from '../db/connection';

// Connection to DB
pool.connect();


//  Authentication Class
class Authentication {
  // @params req REQUEST, res RESPONSE
  // @return token
  // @desc Sign up a user
  static signup(req, res) {
    const { email, password, address } = req.body;
    // TODO: Validation done on frontend
    const hashed = hashPassword(password);

    // Generate random number for our slug
    const slug = generator();
    // Insert the credientals into db
    const query = 'INSERT INTO users(email,password,address,slug) VALUES ($1, $2, $3, $4) RETURNING role,id';
    const values = [email, hashed, address, slug];
    pool.query(query, values)
      .then((result) => {
        const user = {
          slug,
          id: result.rows[0].id,
          email,
          isAdmin: result.rows[0].role,
        };
        const token = tokenGenerate(user);
        return res.status(201).json({ message: SUCCESSFUL_CREATED_MSG, token });
      })
      .catch((e) => {
        ErrorHandler(res, e, UNIQUE_VIOLATION_MSG);
      });
  }

  // @params req REQUEST, res RESPONSE
  // desc Login a valid user
  // @return token
  static login(req, res) {
    // Body items
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(400)
            .json({ message: INVALID_EMAIL_MSG, token: null });
        }
        const isPassword = verifyPassword(password, result.rows[0].password);
        if (!isPassword) return res.status(400).json({ message: INVALID_EMAIL_PASSWORD_MSG });
        const user = {
          email: result.rows[0].email,
          id: result.rows[0].id,
          slug: result.rows[0].slug,
          isAdmin: result.rows[0].role,
        };
        // Generate a token for our user
        const token = tokenGenerate(user);
        return res.status(200).json({ message: LOGIN_SUCCESS_MSG, token });
      })
      .catch((e) => {
        ErrorHandler(res, e, SERVER_ERROR_MSG);
      });
    return false;
  }
}

export default Authentication;
