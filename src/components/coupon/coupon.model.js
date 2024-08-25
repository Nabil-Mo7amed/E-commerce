const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code required"],
      trim: true,
      unique: [true, "coupon code must be unique"],
    },
    expire: {
      type: Date,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const couponModel = mongoose.model("coupon", schema);

module.exports = couponModel;
