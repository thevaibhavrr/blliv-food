const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const serviceRoute = require("./routes/servrice");
const Saller = require("./routes/sallerroute");
const Product = require("./routes/productroute"); 
const database = require("./config/database");

dotenv.config();
dotenv.config({ path: "./config/config.env" });
app.use(cors());
app.use(express.json());

database();

app.use("/api", serviceRoute,Product, Saller);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.get("/", (req, res) => {
  res.send("Hello Testing is working  !");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5008");
});
