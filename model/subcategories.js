const mongoose = require("mongoose");

const subservice = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  active: {
    type: String,
    default: "true",
  },
  positionId: {
    type: Number,
  },
  categoriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

module.exports = mongoose.model("Subcategories", subservice);
