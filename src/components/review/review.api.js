const { UploadSingleFile } = require("../../utils/FileUpload");
const { protectedRoutes, allowedTo } = require("../user/user.auth");
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("./review.service");

const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("user"),
    UploadSingleFile("image", "review"),
    createReview
  )
  .get(getReviews);
router
  .route("/:id")
  .get(getReview)
  .put(
    protectedRoutes,
    allowedTo("user"),
    UploadSingleFile("image", "review"),
    updateReview
  )
  .delete(protectedRoutes, allowedTo("user,admin"), deleteReview);

module.exports = router;
