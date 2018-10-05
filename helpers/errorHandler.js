
const errorHandler = (res, e, msg, status = 400) => res.status(status).json({
  message: msg,
  error: e,
});

export default errorHandler;
