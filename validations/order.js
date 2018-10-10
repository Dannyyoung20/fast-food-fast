
const ACCEPTED_STATUS = ['processing', 'cancelled', 'completed'];

class Validations {
  static update(req, res, next) {
    const { status } = req.body;
    // Check if status exists
    const cleanedStatus = status.trim();
    if (!cleanedStatus) return res.status(400).json({ message: 'Status Property Required' });

    if (typeof cleanedStatus !== 'string') return res.status(400).json({ message: 'Invalid Status Provided' });
    const lowerCaseStatus = status.toLowerCase();
    const isInArray = ACCEPTED_STATUS.findIndex(ele => ele === lowerCaseStatus);
    if (isInArray === -1) {
      return res.status(400).json({ message: 'Invalid Status Provided' });
    }
    return next();
  }

  static post(req, res, next) {
    const { mealName, qty, address } = req.body;
    const cleanedMealName = mealName.trim();
    const cleanedQty = qty.trim();
    const cleanedAddress = address.trim();

    if (!cleanedAddress || !cleanedMealName || !cleanedQty) {
      return res.status(400)
        .json({ message: 'Meal name, Quantity,Address are Required' });
    }
    if (typeof cleanedAddress !== 'string') return res.status(400).json({ message: 'Invalid Address' });
    if (typeof cleanedQty !== 'number') return res.status(400).json({ message: 'Invalid Quantity' });
    if (typeof cleanedMealName !== 'string') return res.status(400).json({ message: 'Invalid Meal Name' });

    return next();
  }
}

export default Validations;
