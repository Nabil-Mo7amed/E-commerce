const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const categoryModel = require("./category.model");
const slugify = require("slugify");
const factory = require("../Handlers/handler.factory");

exports.createCategory = catchAsyncError(async (req, res) => {
  console.log(req.file);
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file?.filename;
  let category = new categoryModel(req.body);
  await category.save();
  res.status(200).json(category);
});

exports.getCategories = catchAsyncError(async (req, res) => {
  let categories = await categoryModel.find({});
  res.status(200).json(categories);
});

exports.getCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let category = await categoryModel.findById(id);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json(category);
});
exports.updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  req.body.image = req.file.filename;
  let category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json(category);
});
exports.deleteCategory = factory.deleteOne(categoryModel);
