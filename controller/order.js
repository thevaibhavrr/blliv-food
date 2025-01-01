const Service = require("../model/categories");
const Product = require("../model/products");
const Order = require("../model/order");
const sendEmail = require("../utils/sendmail");
const fcm = require("../firebase/fcm");

const createOrder = async (req, res) => {
  try {
    // Create order in the database
    const order = await Order.create(req.body);

    // Populate product details
    await order.populate({
      path: "products.productId",
      select: "name FinalPrice description thumbnail",
    });

    // Send order confirmation email
    const emailSubject = "Order Confirmation - " + order._id;
    const emailMessage = generateOrderEmail(order); // Function to generate the email message

    // List of recipient emails
    const recipientEmails = [
      "vaibhavrathorema@gmail.com",
      "Manish78690468@gmail.com",
      "Fooddeliveeyy1@gmail.com",
    ];

    // Send email to all recipients
    for (let recipientEmail of recipientEmails) {
      await sendEmail(recipientEmail, emailSubject, emailMessage, true); // Send email as HTML
    }

    // Send FCM notification to admin
    const fcmTemplate = generateOrderFcmTemplate(order); // Function to generate the FCM template
    fcm.sendToAdminOrderTopic(fcmTemplate);

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}; 
 
// Helper function to format date to a readable format
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return new Date(date).toLocaleString(undefined, options); // Localized date format
};

const generateOrderFcmTemplate = (order) => {
  const productName = order.products.map((item) => item.productId.name).join(", ");
  const title = `₹${order.totalAmount} Order, ` + order._id;
  const body = `User- ${order.username} productName- ${productName} `;

  return {
    title,
    body,
  };
};

// Generate HTML content for the order email with images and styling
const generateOrderEmail = (order) => {
  let productsHTML = "";

  // Loop through each product and generate HTML for each item
  order.products.forEach((item) => {
    const product = item.productId;
    const imageUrl = product.thumbnail || ""; // Assume thumbnail is the image URL

    productsHTML += `
      <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 15px;">
        <img src="${imageUrl}" alt="${product.name}" style="max-width: 150px; margin-right: 15px; float: left;">
        <div style="float: left; max-width: calc(100% - 170px);">
          <h3 style="margin: 0;">${product.name}</h3>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Price:</strong> ₹${product.FinalPrice}</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    `;
  });

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9; max-width: 600px; margin: auto;">
      <h2 style="text-align: center; color: #2c3e50;">Order Confirmation</h2>
      <p><strong>Username:</strong> ${order.username}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Mobile Number:</strong> ${order.mobileNumber}</p>
      <p><strong>Order Date and Time:</strong> ${formatDate(
        order.createdAt
      )}</p> <!-- Order Time and Date -->
      
      <h3>Products:</h3>
      ${productsHTML}
      
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Order Date and Time:</strong> ${formatDate(
        order.createdAt
      )}</p> <!-- Order Time and Date -->
      
      <hr style="border-top: 1px solid #ddd;">
      
      <p style="text-align: center; font-size: 14px; color: #888;">Thank you for shopping with us!</p>
    </div>
  `;
};

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get order by id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update order by id
const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getorderbystatus = async (req, res) => {
  try {
    const status = req.query.status || "Pending";
    const orders = await Order.find({ status: status }).populate({
      path: "products.productId",
      select:
        "name shopname price FinalPrice discountPercentage thumbnail availableTimes minorderquantity packof active ourprice",
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getorderbystatus,
};
