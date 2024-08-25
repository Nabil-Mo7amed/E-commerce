const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const reviewModel = require("../review/review.model");
const factory = require("../Handlers/handler.factory");

exports.createReview = catchAsyncError(async (req, res) => {
  let isReviewed = await reviewModel.findOne({
    userId: req.user._id,
    productId: req.body.productId,
  });
  if (isReviewed) return next(new AppError("you have already reviewed", 400));
  let review = new reviewModel(req.body);
  await review.save();
  res.status(200).json(review);
});

exports.getReviews = catchAsyncError(async (req, res) => {
  let review = await reviewModel.find({});
  res.status(200).json(review);
});

exports.getReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let review = await reviewModel.findById(id);
  !review && next(new AppError("Category not found", 404));
  review && res.status(200).json(review);
});

exports.updateReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let isReview = await reviewModel.findById(id);
  //req.user token
  console.log(isReview.userId._id.toString());

  if (isReview.userId._id.toString() == req.user._id.toString()) {
    let review = await reviewModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !review && next(new AppError("Category not found", 404));
    review && res.status(200).json(review);
  } else {
    next(new AppError("not access for you", 404));
  }
});

exports.deleteReview = factory.deleteOne(reviewModel);
