
const errorHandler = (res, e, msg, status = 400) => {
  const response = res.status(status).json({
    message: msg,
    error: e,
  });
  return response;
};

export default errorHandler;
