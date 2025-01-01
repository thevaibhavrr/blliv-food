const Data = require("../controller/saller");
const express = require("express");
const Saller = express.Router();


 Saller.get("/get-all-saller", Data.getAllSaller);
 Saller.post("/create-saller", Data.createSaller);
 Saller.delete("/delete-saller/:id", Data.deleteSaller);
 Saller.put("/update-saller/:id", Data.updateSaller);
 Saller.get("/get-single-saller/:id", Data.getSallerById);

 module.exports = Saller
