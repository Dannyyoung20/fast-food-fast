import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Expirtion time in milliseconds
const EXPIRATION_TIME = 86000;

const { JWT_SECRET } = process.env;

const tokenGenerate = (user) => {
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: EXPIRATION_TIME });
  return token;
};

export default tokenGenerate;
