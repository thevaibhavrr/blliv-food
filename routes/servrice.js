const ServiceData = require("../controller/services");
const OrderData = require("../controller/order");
const Admin = require("../controller/admin");
const express = require("express");
const service = express.Router();

service.get("/get-all-categories", ServiceData.getAllServices);
service.get("/get-all-categories-for-user", ServiceData.getAllServicesforuser);
service.post("/add-category", ServiceData.createService);
service.delete("/delete-category/:id", ServiceData.deleteService);
service.put("/update-category/:id", ServiceData.updateService); 
service.get("/get-single-category/:id", ServiceData.getservicebyid);
service.get("/services/search/:name", ServiceData.searchServices);
// getsubcatogorybycatogeyname
service.get("/get-subcategories-by-category-name/:name", ServiceData.getsubcatogorybycatogeyname);

// product
service.get("/get-products-by-service-id/:name", ServiceData.getproductsbyserviceid);
service.post("/create-product", ServiceData.createProduct);
service.delete("/delete-product/:id", ServiceData.deleteProduct);
service.put("/update-product/:id", ServiceData.updateProduct);
service.get("/get-single-product/:id", ServiceData.getProductById);
service.get("/get-all-products", ServiceData.getAllProducts);
service.get("/products/search", ServiceData.searchProducts);



// order
service.get("/get-all-orders", OrderData.getAllOrders);
service.get("/get-second-order-by-id/:id", OrderData.getOrderById);
service.get("/get-order-by-id/:id", OrderData.getOrderById);
service.put("/update-second-order-by-id/:id", OrderData.updateOrderById);
service.delete("/delete-order/:id", OrderData.deleteOrderById);
service.get("/get-all-second-order", OrderData.getorderbystatus); 
service.post("/create-order", OrderData.createOrder);

// admin 
service.get("/metrics", Admin.calculateMetrics);
service.get("/today-report", Admin.getTodayReport);
service.get("/overall-report", Admin.getOverallReport);
 

module.exports = service;
