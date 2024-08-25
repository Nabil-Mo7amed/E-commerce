const { protectedRoutes, allowedTo } = require("../user/user.auth");
const { addToAddress, removeFromAddress, getUserAddress } = require("./address.service");


const router = require("express").Router({ mergeParams: true });

router.use(protectedRoutes, allowedTo("user"));

router
  .route("/")
  .patch(addToAddress)
  .delete(removeFromAddress)
  .get(getUserAddress);

module.exports = router;
