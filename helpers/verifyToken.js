import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

const verify = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

export default verify;
