const mongoose = require("mongoose");
const service = require("./categories");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shopname: {
    type: String,
  },
  ourprice: {
    type: Number,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  FinalPrice: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategories",
    required: true,
  },
  description: {
    type: String,
  },
  active: {
    type: String,
    default: "true",
  },
  // availableTimes: {
  //   type: [String],
  // },
  openTime: {
    type: String,
  },
  closeTime: {
    type: String,
  },
  Isclosed: {
    type: String,
    default: "false",
  },
  minorderquantity: {
    type: Number,
  },
  packof: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  poistionId: {
    type: String,
  },
});

module.exports = mongoose.model("Product", serviceSchema);
