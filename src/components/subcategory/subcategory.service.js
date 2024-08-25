const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const subcategoryModel = require("../subcategory/subcategory.model");
const slugify = require("slugify");
const factory = require("../Handlers/handler.factory");

exports.createSubcategory = catchAsyncError(async (req, res) => {
  const { name, categoryId } = req.body;
  let subcategory = new subcategoryModel({
    name,
    slug: slugify(name),
    categoryId,
  });
  await subcategory.save();
  res.status(200).json(subcategory);
});

exports.getSubcategories = catchAsyncError(async (req, res) => {
  console.log(req.params);
  let filter = {};
  if (req.params.categoryId) {
    filter = { categoryId: req.params.categoryId };
  }
  let subcategories = await subcategoryModel.find(filter);
  res.status(200).json(subcategories);
});

exports.getSubcategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let subcategory = await subcategoryModel.findById(id);
  if (!subcategory) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json(subcategory);
});
exports.updateSubcategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  let subcategory = await subcategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
      categoryId,
    },
    { new: true }
  );
  if (!subcategory) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json(subcategory);
});
exports.deleteSubcategory = factory.deleteOne(subcategoryModel);
