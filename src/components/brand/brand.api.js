const { UploadSingleFile } = require("../../utils/FileUpload");
const { protectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("./brand.service");

const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    UploadSingleFile("image", "brand"),
    createBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .get(getBrand)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    UploadSingleFile("image", "brand"),
    updateBrand
  )
  .delete(deleteBrand);

module.exports = router;
