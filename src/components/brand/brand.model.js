const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      minlength: [2, "too short brand name"],
      trim: true,
      unique: [true, "brand name unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
// schema.post("init", (doc) => {
//   doc.image = "http://localhost:3000/brand/" + doc.image;
// });

const brandModel = mongoose.model("brand", schema);

module.exports = brandModel;
