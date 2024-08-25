const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const slugify = require("slugify");

exports.deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let document = await model.findByIdAndDelete(id);
    !document && next(new AppError("Document not found", 404));
    document && res.status(200).json({ result: document });
  });
};
