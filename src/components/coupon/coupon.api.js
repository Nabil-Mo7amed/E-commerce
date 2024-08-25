const { protectedRoutes, allowedTo } = require("../user/user.auth");
const { createCoupon, getCoupons, getCoupon, updateCoupon, deleteCoupon } = require("./coupon.service");

const router = require("express").Router({ mergeParams: true });

router.use(protectedRoutes, allowedTo("admin"));

router.route("/").post(createCoupon).get(getCoupons);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
