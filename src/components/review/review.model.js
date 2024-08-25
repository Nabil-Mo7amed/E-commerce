const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "name required"],
      minlength: [2, "too short brand name"],
      trim: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
    },
    ratingAverage: {
      type: Number,
      min: [1, "ratingAverage must be greater than 1"],
      max: [5, "ratingAverage must be less than 1"],
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("userId", "name");
});

const reviewModel = mongoose.model("review", schema);

module.exports = reviewModel;
