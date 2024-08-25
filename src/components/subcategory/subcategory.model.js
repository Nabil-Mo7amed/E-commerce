const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      minlength: [2, "too short subcategory name"],
      trim: true,
      unique: [true, "subcategory name unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },

    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

const subcategoryModel = mongoose.model("subcategory", schema);

module.exports = subcategoryModel;
