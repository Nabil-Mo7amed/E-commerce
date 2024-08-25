const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const couponModel = require("../coupon/coupon.model");
const factory = require("../Handlers/handler.factory");

exports.createCoupon = catchAsyncError(async (req, res) => {
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.status(200).json(coupon);
});

exports.getCoupons = catchAsyncError(async (req, res) => {
  let coupon = await couponModel.find({});
  res.status(200).json(coupon);
});

exports.getCoupon = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let coupon = await couponModel.findById(id);
  !coupon && next(new AppError("Category not found", 404));
  coupon && res.status(200).json(coupon);
});

exports.updateCoupon = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let coupon = await couponModel.findByIdAndUpdate(id, req.body, { new: true });
  !coupon && next(new AppError("Category not found", 404));
  coupon && res.status(200).json(coupon);
});

exports.deleteCoupon = factory.deleteOne(couponModel);
