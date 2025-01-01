const mongoose = require("mongoose");

const sallerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shopname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  googlemapLink: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  role: {
    type: String,
    default: "saller",
  },
});

module.exports = mongoose.model("saller", sallerSchema);
