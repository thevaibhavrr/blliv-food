const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    mobileNumber: { 
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
    },
    recivedAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
    paymentMethod: {
        type: String,
    },
    createdAt: {
        type: Date,
      },
      Isseen:{
        type: String,
        default: "false",
      },
      called:{
        type: String,
        default: "false",
      },
      deliveredBy: {
        type: String,
      },
      profit: {
        type: Number,
      },   
    
});

module.exports = mongoose.model("Order", orderSchema); 