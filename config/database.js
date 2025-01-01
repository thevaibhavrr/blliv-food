const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDb = async () => {
  try {
    // await mongoose.connect("mongodb+srv://vaibhavrathorema:Y9HsBzd2qM7KSGxr@delivery.pe6rr.mongodb.net/delivery", {
    await mongoose.connect("mongodb+srv://vaibhavrathorema:Y9HsBzd2qM7KSGxr@delivery.pe6rr.mongodb.net/belivmart");
    console.log(" connected to Mongoose database.");
  } catch (error) {
    console.error("Unable to connect to MongoDB Database", error);
  }
};

// export database
module.exports = connectDb