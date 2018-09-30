import generator, {
  hashPassword,
  tokenGenerate,
  tokenVerify,
  verifyPassword,
} from '../helpers';
import db from '../db';


//  Authentication Class
class Authentication {
  // @desc Generate a jwt
  // @params obj User Object
  // @return String
  static JWT_GENERATE(obj) {
    return tokenGenerate(obj);
  }

  // @desc Verifies a token
  // @params token JWT_TOKEN
  // @return Object
  static JWT_VERIFY(token) {
    return tokenVerify(token);
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

  // @desc Hashes a password
  // @params password User password
  // @return Boolean
  static VERIFY_PASSWORD(email, password, cb) {
    return verifyPassword(email, password, cb);
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
    const query = 'INSERT INTO users(email,password,address,slug) VALUES ($1, $2, $3, $4)';
    const values = [email, hashed, address, slug];
    db.insert(query, values, (err) => {
      if (err) throw err;
      const user = {
        slug,
        email,
      };
      const token = Authentication.JWT_GENERATE(user);
      return res.status(201).json(token);
    });
  }

}

export default Authentication;
