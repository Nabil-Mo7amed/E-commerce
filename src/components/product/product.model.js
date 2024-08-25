const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name required"],
      minlength: [2, "too short product name"],
      trim: true,
      unique: [true, "product name unique"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "description required"],
      minlength: [2, "too short description name"],
      trim: true,
    },
    // quantity: {
    //   type: Number,
    //   required: [true, "quantity required"],
    //   default: 0,
    // },
    // colors: [String],
    price: {
      type: Number,
      required: [true, "price required"],
    },
    // priceAfterDiscount: {
    //   type: Number,
    //   required: [true, "priceAfterDiscount required"],
    // },
    imageCover: {
      type: String,
    },
    images: [String],
    // soldCount: {
    //   type: Number,
    //   default: 0,
    //   required: [true, "product sold required"],
    // },
    // categoryId: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "category",
    //   required: [true, "product category required"],
    // },
    // subcategoryId: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "subcategory",
    //   required: [true, "product subcategory required"],
    // },
    // brandId: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "brand",
    //   required: [true, "product brand required"],
    // },
    // ratingAverage: {
    //   type: Number,
    //   min: [1, "ratingAverage must be greater than 1"],
    //   max: [5, "ratingAverage must be less than 1"],
    // },
    // ratingCount: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//virtual populate
schema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "productId",
});

schema.pre("findOne", function () {
  this.populate("reviews", "name");
});

schema.post("init", (doc) => {
  if (doc.imageCover && doc.images) {
    doc.imageCover = "http://localhost:3000/product/" + doc.imageCover;
    doc.images = doc.images.map(
      (image) => "http://localhost:3000/product/" + image
    );
  }
});

const productModel = mongoose.model("product", schema);

module.exports = productModel;
