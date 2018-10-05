import {
  REQUIRED_MENU_FIELDS,
} from '../helpers';

class Validations {
  static post(req, res, next) {
    const { imageUrl, name, price } = req.body;

    // Validate name, imageUrl and price if been sent
    if (!name || !imageUrl || !price) {
      return res.status(400).json({ message: REQUIRED_MENU_FIELDS });
    }
    const trimedName = name.trim();
    const trimedImageUrl = imageUrl.trim();
    const trimedPrice = price.trim();

    let integerPrice;

    if (typeof price === 'number') { integerPrice = price; } else { integerPrice = parseInt(trimedPrice, 10); }

    if (typeof integerPrice !== 'number' || trimedPrice % 1 !== 0) {
      return res.status(400).json({ message: 'Price must be a number' });
    }

    if (typeof name !== 'string' || trimedName.length === 0) {
      return res.status(400).json({ message: 'Invalid menu name given' });
    }

    if (typeof imageUrl !== 'string' || trimedImageUrl.length === 0) {
      return res.status(400).json({ message: 'Invalid image url given' });
    }
    // Reference - https://regexr.com/3g1v7
    if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(trimedImageUrl)) {
      return res.status(400).json({ message: 'Invalid image url. Check extension to be sure its png or jpg or gif' });
    }
    return next();
  }
}

export default Validations;
