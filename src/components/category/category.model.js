const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      minlength: [2, "too short category name"],
      trim: true,
      unique: [true, "category name unique"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
schema.post("init", (doc) => {
  doc.image = "http://localhost:3000/category/" + doc.image;
});
const categoryModel = mongoose.model("category", schema);

module.exports = categoryModel;
