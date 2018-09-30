import bcrypt from 'bcryptjs';
import db from '../db';


const verify = (email, password, cb) => {
  const query = `SELECT password FROM users WHERE email = '${email}' `;
  db.selectByEmail(query, (err, response) => {
    if (err) throw err;
    bcrypt.compare(password, response.rows[0].password, (error, res) => {
      cb(error, res);
    });
  });
};

export default verify;
