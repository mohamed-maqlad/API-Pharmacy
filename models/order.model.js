const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    cart: {
      type: Array,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    totalprice: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
    },
    totalamount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", cartSchema);
