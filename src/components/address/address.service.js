const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const userModel = require("../user/user.model");

exports.addToAddress = catchAsyncError(async (req, res, next) => {
  //$addToSet بيبش فى الأرى بدون تكرار
  let { address } = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { address: req.body } },
    {
      new: true,
    }
  );

  !address && next(new AppError("address not found", 404));
  address && res.status(200).json(address);
});

exports.removeFromAddress = catchAsyncError(async (req, res, next) => {
  let { address } = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.body.address } } },
    {
      new: true,
    }
  );

  !address && next(new AppError("address not found", 404));
  address && res.status(200).json(address);
});

exports.getUserAddress = catchAsyncError(async (req, res, next) => {
  let { addresses } = await userModel.findById(req.user._id);

  !addresses && next(new AppError("address not found", 404));
  addresses && res.status(200).json(addresses);
});
