const { UploadMixFiles } = require("../../utils/FileUpload");
const { protectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("./product.service");

const router = require("express").Router();
let fields = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
];

router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("user"),
    UploadMixFiles(fields, "product"),
    createProduct
  )
  .get(getProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    UploadMixFiles(fields, "product"),
    updateProduct
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteProduct);

module.exports = router;
