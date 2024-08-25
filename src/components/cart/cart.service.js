const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");
const cartModel = require("../cart/cart.model");
const productModel = require("../product/product.model");
const couponModel = require("../coupon/coupon.model");

function calTotalCartPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalPrice = totalPrice;

  // if (cart.totalPriceAfterDiscount) {
  //   cart.totalPriceAfterDiscount = (
  //     cart.totalPrice -
  //     (cart.totalPrice * discount) / 100
  //   ).toFixed(1);
  // }
}
exports.addProductToCart = catchAsyncError(async (req, res) => {
  let { price } = await productModel.findById(req.body.product).select("price");
  req.body.price = price;
  console.log(price);

  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    let newCart = new cartModel({
      cartItems: [req.body],
      user: req.user._id,
    });
    calTotalCartPrice(newCart);
    await newCart.save();
    res.status(200).json({ message: "Cart added successfully", newCart });
  } else {
    let findProduct = cart.cartItems.find(
      (elm) => elm.product == req.body.product
    );
    if (findProduct) {
      findProduct.quantity += 1;
    } else {
      cart.cartItems.push(req.body);
    }

    calTotalCartPrice(cart);
    await cart.save();
    res.status(200).json(cart);
  }
});

exports.removeProductFromCart = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.body.itemId } } },
    {
      new: true,
    }
  );
  calTotalCartPrice(cart);
  await cart.save();

  !cartItems && next(new AppError("cartItems not found", 404));
  cartItems && res.status(200).json(cartItems);
});

exports.updateQuantity = catchAsyncError(async (req, res) => {
  let cart = await cartModel.findOne({ user: req.user._id });

  let findProduct = cart.cartItems.find(
    (elm) => elm.product == req.body.product
  );
  if (!findProduct) return next(new AppError("product not found", 404));
  if (findProduct) {
    findProduct.quantity = req.body.quantity;
  }
  calTotalCartPrice(cart);
  await cart.save();
  res.status(200).json(cart);
});

exports.getUserCart = catchAsyncError(async (req, res) => {
  let cart = await cartModel.findOne({ user: req.user._id });

  res.status(200).json({ result: cart.cartItems.length, cart: cart.cartItems });
});

exports.applyCoupon = catchAsyncError(async (req, res) => {
  let { code, discount } = await couponModel.findOne({
    code: req.user.code,
    expires: { $gte: Date.now() },
  });
  if (!code) return next(new AppError("coupon not found or expired", 404));
  let cart = await cartModel.findOne({ user: req.user._id });
  cart.totalPriceAfterDiscount = (
    cart.totalPrice -
    (cart.totalPrice * discount) / 100
  ).toFixed(1);
  cart.discount = discount;
  await cart.save();
  res.status(200).json(cart);
});
