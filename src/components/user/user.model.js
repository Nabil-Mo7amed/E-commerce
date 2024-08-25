const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, "too short brand name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email must be unique"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "too short password"],
    },
    passwordChangedAt: Date,
    phone: {
      type: String,
      required: [true, "phone required"],
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    wishlist: [{ type: mongoose.SchemaTypes.ObjectId, ref: "product" }],
    addresses:[{
      name:String,
      street:String,
      city:String,
      phone:String,
    }],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function () {
  console.log(this);
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
});

schema.pre("findOneAndUpdate", async function () {
  console.log(this);
  this._update.password = await bcrypt.hash(
    this._update.password,
    Number(process.env.ROUND)
  );
});

const userModel = mongoose.model("user", schema);

module.exports = userModel;
