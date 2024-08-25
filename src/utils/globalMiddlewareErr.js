module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.MODE_ENV === "development") {
    devMod(err, res);
  } else {
    prodMod(err, res);
  }
};

let devMod = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    stack: err.stack,
    err,
  });
};
let prodMod = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};
