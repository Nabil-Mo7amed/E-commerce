const userModel = require("./user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const factory = require("../Handlers/handler.factory");

exports.createUser = catchAsyncError(async (req, res, next) => {
  let isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("User already exists", 401));
  let user = new userModel(req.body);
  await user.save();
  res.status(200).json(user);
});

exports.getUsers = catchAsyncError(async (req, res) => {
  let user = await userModel.find({});
  res.status(200).json(user);
});

exports.getUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let user = await userModel.findById(id);
  !user && next(new AppError("User not found", 404));
  user && res.status(200).json(user);
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !user && next(new AppError("Category not found", 404));
  user && res.status(200).json(user);
});

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now();
  let user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !user && next(new AppError("User not found", 404));
  user && res.status(200).json(user);
});
exports.deleteUser = factory.deleteOne(userModel);
