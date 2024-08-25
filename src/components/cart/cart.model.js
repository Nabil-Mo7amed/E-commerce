const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    cartItems: [
      {
        product: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],

    user: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },

    totalPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", schema);

module.exports = cartModel;
