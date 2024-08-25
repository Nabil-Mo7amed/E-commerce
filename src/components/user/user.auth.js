const userModel = require("./user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = catchAsyncError(async (req, res, next) => {
  let isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("User already exists", 401));

  let user = new userModel(req.body);
  await user.save();
  res.status(200).json(user);
});

exports.signin = catchAsyncError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new AppError("incorrect Email or Password ", 401));

  var token = jwt.sign(
    { name: user.name, userId: user._id },
    process.env.JWT_KEY
  );

  res.status(200).json({ token });
});

exports.protectedRoutes = catchAsyncError(async (req, res, next) => {
  let token = req.headers.token;
  if (!token) return next(new AppError("token not provided", 401));

  let decoded = jwt.verify(token, process.env.JWT_KEY);
  console.log(decoded);

  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("user not found", 401));

  if (user.passwordChangedAt) {
    let changePassword = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (changePassword > decoded.iat)
      return next(new AppError("token not valid", 401));
  }

  req.user = user;
  console.log(req.user);

  next();
});

exports.allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Unauthorized access", 403));
    }
    next();
  });
};
