// @params res RESPONSE, result DB_ROW, status Status Code
// @desc Handle our query response
// @return item
const handleResponse = (res, result, msg, status = 200) => {
  return res.status(status).json({ message: msg, menu: result });
};

export default handleResponse;
