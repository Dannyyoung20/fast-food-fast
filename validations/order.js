
const ACCEPTED_STATUS = ['processing', 'cancelled', 'completed'];

class Validations {
  static update(req, res, next) {
    const { status } = req.body;
    const lowerCaseStatus = status.toLowerCase();
    const isInArray = ACCEPTED_STATUS.findIndex(ele => ele === lowerCaseStatus);
    if (isInArray === -1) {
      return res.status(400).json({ message: 'Invalid Status Provided' });
    }
    return next();
  }
}

export default Validations;
