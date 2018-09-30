import bcrypt from 'bcryptjs';


const verify = (password, dbPassword) => {
  const isPassword = bcrypt.compareSync(password, dbPassword);
  console.log('bcrypt', isPassword);
  return isPassword;
};

export default verify;
