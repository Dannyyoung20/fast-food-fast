import bcrypt from 'bcryptjs';


const verify = (password, dbPassword) => {
  const isPassword = bcrypt.compareSync(password, dbPassword);
  return isPassword;
};

export default verify;
