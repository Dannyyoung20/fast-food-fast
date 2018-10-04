import generator, {
  hashPassword,
  tokenGenerate,
  verifyPassword,
  errorHandler,
  UNIQUE_VIOLATION_MSG,
  LOGIN_SUCCESS_MSG,
  INVALID_EMAIL_PASSWORD_MSG,
  SERVER_ERROR_MSG,
  SUCCESSFUL_CREATED_MSG,
  checkIsEmail,
  INVALID_EMAIL_MSG,
  INVALID_ADDRESS_MSG,
  EMAIL_PASSWORD_REQUIRED,
  EMAIL_PASSWORD_ADDRESS_REQUIRED,
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

    // Validate email and password if been sent
    if (!email || !password || !address) {
      res.status(400).json({ message: EMAIL_PASSWORD_ADDRESS_REQUIRED });
      return;
    }

    // Validate Email
    const validEmail = checkIsEmail(email);
    if (!validEmail) {
      res.status(400).json({ message: INVALID_EMAIL_MSG });
      return;
    }
    // Validate Address
    if (address.length < 8) {
      res.status(400).json({ message: INVALID_ADDRESS_MSG });
      return;
    }

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
        };
        const token = tokenGenerate(user);
        return res.status(201).json({ message: SUCCESSFUL_CREATED_MSG, token });
      })
      .catch((e) => {
        errorHandler(res, e, UNIQUE_VIOLATION_MSG);
      });
  }

  // @params req REQUEST, res RESPONSE
  // desc Login a valid user
  // @return token
  static login(req, res) {
    // Body items
    const { email, password } = req.body;

    // Validate email and password if been sent
    if (!email || !password) {
      res.status(400).json({ message: EMAIL_PASSWORD_REQUIRED });
      return;
    }

    // Validate Email
    const validEmail = checkIsEmail(email);
    if (!validEmail) {
      res.status(400).json({ message: INVALID_EMAIL_MSG });
      return;
    }

    const query = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(400)
            .json({ message: INVALID_EMAIL_PASSWORD_MSG, token: null });
        }
        const isPasswordValid = verifyPassword(password, result.rows[0].password);
        if (!isPasswordValid) return res.status(400).json({ message: INVALID_EMAIL_PASSWORD_MSG });
        const user = {
          id: result.rows[0].id,
          slug: result.rows[0].slug,
        };
        // Generate a token for our user
        const token = tokenGenerate(user);
        return res.status(200).json({ message: LOGIN_SUCCESS_MSG, token });
      })
      .catch((e) => {
        errorHandler(res, e, SERVER_ERROR_MSG);
      });
  }
}

export default Authentication;
