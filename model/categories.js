const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  poistionId: {
    type: String,
  },
});

module.exports = mongoose.model("Categories", serviceSchema);
