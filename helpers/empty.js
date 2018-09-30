
// Helper function to check if an Array or an Object is empty

// @params ds(Data Structure) Array | Object
// @return bool
const isEmpty = (ds) => {
  if (Array.isArray(ds) && !ds.length) {
    return true;
  }

  if (typeof array === 'object') {
    if (Object.keys(ds).length === 0) {
      return true;
    }
  }
  return false;
};

export default isEmpty;
