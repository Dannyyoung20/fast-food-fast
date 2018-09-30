import bcrypt from 'bcryptjs';


const ROUNDS = 10;

// Hash a given password
const hash = (password) => {
  const SALT = bcrypt.genSaltSync(ROUNDS);
  const hashed = bcrypt.hashSync(password, SALT);
  return hashed;
};

export default hash;
