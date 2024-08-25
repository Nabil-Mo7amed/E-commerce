const { protectedRoutes, allowedTo } = require("../user/user.auth");
const {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
  applyCoupon,
  getUserCart,
} = require("./cart.service");

const router = require("express").Router({ mergeParams: true });
router.use(protectedRoutes, allowedTo("user"));

router
  .route("/")
  .post(addProductToCart)
  .delete(removeProductFromCart)
  .put(updateQuantity)
  .get(getUserCart);

router.post("/applyCoupon", applyCoupon);

module.exports = router;
