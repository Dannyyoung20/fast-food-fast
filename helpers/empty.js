
// Helper function to check if an Array or an Object is empty

// @params array Array | Object
// @return bool
const isEmpty = (array) => {
  if (Array.isArray(array) && !array.length) {
    return true;
  }

  if (typeof array === 'object') {
    if (Object.keys(array).length === 0) {
      return true;
    }
  }
  return false;
};

export default isEmpty;
