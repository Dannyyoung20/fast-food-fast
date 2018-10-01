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
  // @desc Generate a jwt
  // @params obj User Object
  // @return String
  static JWT_GENERATE(obj) {
    return tokenGenerate(obj);
  }

  // @desc Generate a slug string
  // @params obj User Object
  // @return String
  static SLUG_GENERATE() {
    return generator();
  }

  // @desc Hashes a password
  // @params password User password
  // @return String
  static HASH_PASSWORD(password) {
    return hashPassword(password);
  }

  // @desc Gets a DB_PASSWORD
  // @params password User password
  // @return Boolean | DB_PASSWORD
  static GET_PASSWORD(email, cb) {
    const query = `SELECT password FROM users WHERE email = '${email}' `;
    pool.query(query, (err, result) => {
      if (result.rowCount === 0) return false;
      cb(result.rows[0].password);
      return false;
    });
  }

  // @params email User email, password User password, cb Callback
  // @desc Verify password with bcrypt
  // @return Boolean
  static VERIFY_PASSWORD(email, password, cb) {
    Authentication.GET_PASSWORD(email, (dbPassword) => {
      if (!dbPassword) return false;
      const isPassword = verifyPassword(password, dbPassword);
      cb(isPassword);
      return false;
    });
  }

  // @params req REQUEST, res RESPONSE
  // @return token
  // @desc Sign up a user
  static signup(req, res) {
    const { email, password, address } = req.body;
    // TODO: Validation done on frontend
    const hashed = Authentication.HASH_PASSWORD(password);

    // Generate random number for our slug
    const slug = Authentication.SLUG_GENERATE();
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
        const token = Authentication.JWT_GENERATE(user);
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
    // Verify user password
    Authentication.VERIFY_PASSWORD(email, password, (isPassword) => {
      if (!isPassword) return res.status(400).json({ message: INVALID_EMAIL_PASSWORD_MSG });
      return true;
    });

    const query = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(400)
            .json({ message: INVALID_EMAIL_MSG, token: null });
        }
        const user = {
          email: result.rows[0].email,
          id: result.rows[0].id,
          slug: result.rows[0].slug,
          isAdmin: result.rows[0].role,
        };
        // Generate a token for our user
        const token = Authentication.JWT_GENERATE(user);
        return res.status(200).json({ message: LOGIN_SUCCESS_MSG, token });
      })
      .catch((e) => {
        ErrorHandler(res, e, SERVER_ERROR_MSG, 500);
      });
    return false;
  }
}

export default Authentication;
