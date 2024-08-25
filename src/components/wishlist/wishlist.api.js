const { protectedRoutes, allowedTo } = require("../user/user.auth");
const {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} = require("./wishlist.service");

const router = require("express").Router({ mergeParams: true });

router.use(protectedRoutes, allowedTo("user"));

router
  .route("/")
  .patch(addToWishlist)
  .delete(removeFromWishlist)
  .get(getUserWishlist);

module.exports = router;
