const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: Number,
      min: 5,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.method("getAuthToken", function () {
  const JWT_SEC = process.env.JWT_SEC;
  const token = jwt.sign(
    {
      userid: this._id,
      isAdmin: this.isAdmin,
    },
    JWT_SEC,
    {
      expiresIn:"30d"
    }
  );
  return token;
});



module.exports = mongoose.model("user",userSchema)