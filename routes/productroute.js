const express = require("express");
const Product = express.Router();
const Data = require("../controller/product");

Product.get("/get-all-products-for-user/:name", Data.getproductsbysubcategoryName);

module.exports = Product;