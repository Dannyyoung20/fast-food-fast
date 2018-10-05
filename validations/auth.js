import {
  checkIsEmail,
  INVALID_EMAIL_MSG,
  INVALID_ADDRESS_MSG,
  EMAIL_PASSWORD_ADDRESS_REQUIRED,
  EMAIL_PASSWORD_REQUIRED,
} from '../helpers';

const specialChars = ['*', '|', ':', '<', '>', '{', '}', ';', '(', ')', '@', '&', '$', '#', '%'];
const splChars = "*|,\":<>[]{}`\';()@&$#%";
class Validations {
  static signup(req, res, next) {
    const { email, password, address } = req.body;

    // Validate email and password if been sent
    if (!email || !password || !address) {
      return res.status(400).json({ message: EMAIL_PASSWORD_ADDRESS_REQUIRED });
    }

    const trimedEmail = email.trim();
    const trimedPassword = password.trim();
    const trimedAddress = address.trim();

    // Validate email and password if been sent
    if (typeof email !== 'string' || trimedEmail.length === 0) {
      return res.status(400).json({ message: 'Empty Email String was Passed...' });
    }

    if (typeof password !== 'string' || trimedPassword.length === 0) {
      return res.status(400).json({ message: 'Empty Password String was Passed...' });
    }

    if (typeof address !== 'string' || trimedAddress.length === 0) {
      return res.status(400).json({ message: 'Empty Address String was Passed...' });
    }

    // Validate Email
    const validEmail = checkIsEmail(trimedEmail);
    if (!validEmail) {
      return res.status(400).json({ message: INVALID_EMAIL_MSG });
    }
    // Validate Address Length
    if (address.length < 8 || address.length > 50) {
      return res.status(400).json({ message: INVALID_ADDRESS_MSG });
    }

    // Validate Email Length
    if (email.length > 50) {
      return res.status(400).json({ message: INVALID_EMAIL_MSG });
    }

    // Validate Password Length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password too short' });
    }

    // Validate Password Length
    if (password.length > 18) {
      return res.status(400).json({ message: 'Password too Long' });
    }
    return next();
  }

  static login(req, res, next) {
    // Body items
    const { email, password } = req.body;

    // Validate email and password if been sent
    if (!email || !password) {
      return res.status(400).json({ message: EMAIL_PASSWORD_REQUIRED });
    }

    const trimedEmail = email.trim();
    const trimedPassword = password.trim();

    // Validate email and password if been sent
    if (!typeof (email) === 'string' || trimedEmail.length === 0) {
      return res.status(400).json({ message: 'Empty Email String was Passed...' });
    }

    if (!typeof (password) === 'string' || trimedPassword.length === 0) {
      return res.status(400).json({ message: 'Empty Password String was Passed...' });
    }

    // Validate Email
    const validEmail = checkIsEmail(trimedEmail);
    if (!validEmail) {
      return res.status(400).json({ message: INVALID_EMAIL_MSG });
    }
    return next();
  }

  static slug(req, res, next) {
    const { orderID } = req.params;
    const isInArray = specialChars.findIndex(ele => ele === orderID);
    if (isInArray !== -1) {
      return res.status(400).json({ message: 'Invalid orderID Provided' });
    }
    for (let i = 0; i < orderID.length; i += 1) {
      if (splChars.indexOf(orderID.charAt(i)) !== -1) {
        return res.status(400).json({ message: 'Illegal characters detected!' });
      }
    }
    return next();
  }
}

export default Validations;
