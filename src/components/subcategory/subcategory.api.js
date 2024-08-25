const { protectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("./subcategory.service");

const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), createSubcategory)
  .get(getSubcategories);
router
  .route("/:id")
  .get(getSubcategory)
  .put(protectedRoutes, allowedTo("admin"), updateSubcategory)
  .delete(deleteSubcategory);

module.exports = router;
