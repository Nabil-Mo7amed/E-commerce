const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const productModel = require("../product/product.model");
const slugify = require("slugify");
const factory = require("../Handlers/handler.factory");
const ApiFeatures = require("../../utils/ApiFeatures");

exports.createProduct = catchAsyncError(async (req, res) => {
  console.log(req.files);
  req.body.slug = slugify(req.body.name);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((file) => file.filename);
  let product = new productModel(req.body);
  await product.save();
  res.status(200).json(product);
});

exports.getProducts = catchAsyncError(async (req, res) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .sort()
    .search();
  let products = await apiFeatures.mongooseQuery;
  res.status(200).json({ page: apiFeatures.page, products });
});

exports.getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let product = await productModel.findById(id);
  !product && next(new AppError("Category not found", 404));
  product && res.status(200).json(product);
});
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  let product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !product && next(new AppError("Category not found", 404));
  product && res.status(200).json(product);
});
exports.deleteProduct = factory.deleteOne(productModel);
