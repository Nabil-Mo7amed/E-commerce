const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const userModel = require("../user/user.model");

exports.addToWishlist = catchAsyncError(async (req, res, next) => {
    //$addToSet بيبش فى الأرى بدون تكرار
  let { wishlist } = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: req.body.product } },
    {
      new: true,
    }
  );

  !wishlist && next(new AppError("wishlist not found", 404));
  wishlist && res.status(200).json(wishlist);
});

exports.removeFromWishlist = catchAsyncError(async (req, res, next) => {
  let { wishlist } = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: req.body.product } },
    {
      new: true,
    }
  );

  !wishlist && next(new AppError("wishlist not found", 404));
  wishlist && res.status(200).json(wishlist);
});

exports.getUserWishlist = catchAsyncError(async (req, res, next) => {

   let {wishlist} = await userModel.findById(req.user._id) 

  !wishlist && next(new AppError("wishlist not found", 404));
  wishlist && res.status(200).json(wishlist);
});

