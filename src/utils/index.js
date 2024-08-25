exports.allRequires=(app)=>{
app.use("/categories", require("../components/category/category.api"));
app.use("/subcategories",require("../components/subcategory/subcategory.api"));
app.use("/brands", require("../components/brand/brand.api"));
app.use("/products", require("../components/product/product.api"));
app.use("/users", require("../components/user/user.api"));
app.use("/reviews", require("../components/review/review.api"));
app.use("/wishlists", require("../components/wishlist/wishlist.api"));
app.use("/addresses", require("../components/address/address.api"));
app.use("/coupons", require("../components/coupon/coupon.api"));
app.use("/carts", require("../components/cart/cart.api"));
}