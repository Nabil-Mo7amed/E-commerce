const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("./category.service");

const router = require("express").Router();

const subcategoryRoutes = require("../subcategory/subcategory.api");
const { UploadSingleFile } = require("../../utils/FileUpload");
const { protectedRoutes, allowedTo } = require("../user/user.auth");
router.use("/:categoryId/subcategories", subcategoryRoutes);

router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    UploadSingleFile("image", "category"),
    createCategory
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(
    allowedTo("admin"),
    UploadSingleFile("image", "category"),
    updateCategory
  )
  .delete(deleteCategory);

module.exports = router;
