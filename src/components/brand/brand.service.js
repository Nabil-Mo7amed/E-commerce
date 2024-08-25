const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const brandModel = require("../brand/brand.model");
const slugify = require("slugify");
const factory = require("../Handlers/handler.factory");
const cloudinary = require("cloudinary");
// Configuration
cloudinary.config({
  cloud_name: "dljpruwje",
  api_key: "969743949918563",
  api_secret: "nP9RqnsscLKR9poiBlFLRz9pw58", // Click 'View Credentials' below to copy your API secret
});

exports.createBrand = catchAsyncError(async (req, res) => {
  // Upload an image

  const uploadResult = await cloudinary.uploader
    .upload(req.file.path)
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  req.body.image = uploadResult.secure_url;
  req.body.slug = slugify(req.body.name);
  let brand = new brandModel(req.body);
  await brand.save();
  res.status(200).json(brand);
});

exports.getBrands = catchAsyncError(async (req, res) => {
  console.log(req.params);
  let filter = {};
  if (req.params.categoryId) {
    filter = { categoryId: req.params.categoryId };
  }
  let brand = await brandModel.find(filter);
  res.status(200).json(brand);
});

exports.getBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let brand = await brandModel.findById(id);
  !brand && next(new AppError("Category not found", 404));
  brand && res.status(200).json(brand);
});
exports.updateBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  req.body.image = req.file?.filename;
  let brand = await brandModel.findByIdAndUpdate(id, req.body, { new: true });
  !brand && next(new AppError("Category not found", 404));
  brand && res.status(200).json(brand);
});
exports.deleteBrand = factory.deleteOne(brandModel);
