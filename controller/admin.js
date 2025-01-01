// const Service = require("../model/service");
// const Product = require("../model/products");
// const Order = require("../model/order");

// const calculateMetrics = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Fetch all orders with populated product data
//     const orders = await Order.find({}).populate({
//       path: "products.productId",
//       select: "name FinalPrice ourprice",
//     });

//     // Initialize metrics
//     let totalDeliveredOrders = 0;
//     let totalDeliveredProducts = 0;
//     let totalNetProfit = 0;
//     let todayNetProfit = 0;
//     let todaySales = 0;
//     let overallSales = 0;

//     const productSales = {};

//     // Calculate metrics
//     orders.forEach((order) => {
//       const orderTotalAmount = Number(order.totalAmount) || 0;

//       // Check if the order is delivered
//       if (order.status === "Delivered") {
//         totalDeliveredOrders++;
//         order.products.forEach((product) => {
//           const productQuantity = Number(product.quantity) || 0;
//           const finalPrice = Number(product.productId?.FinalPrice) || 0;
//           const ourPrice = Number(product.productId?.ourprice) || 0;

//           totalDeliveredProducts += productQuantity;
//           totalNetProfit += productQuantity * (finalPrice - ourPrice);

//           // Track sales for top-selling products
//           const productId = product.productId?._id;
//           if (productId) {
//             productSales[productId] = productSales[productId] || {
//               name: product.productId.name,
//               quantity: 0,
//               totalRevenue: 0,
//             };
//             productSales[productId].quantity += productQuantity;
//             productSales[productId].totalRevenue += productQuantity * finalPrice;
//           }
//         });
//       }

//       // Check if the order was delivered today
//       if (new Date(order.deliveredAt).getTime() >= today.getTime() && order.status === "Delivered") {
//         todaySales += orderTotalAmount;
//         order.products.forEach((product) => {
//           const productQuantity = Number(product.quantity) || 0;
//           const finalPrice = Number(product.productId?.FinalPrice) || 0;
//           const ourPrice = Number(product.productId?.ourprice) || 0;

//           todayNetProfit += productQuantity * (finalPrice - ourPrice);
//         });
//       }

//       // Add to overall sales
//       overallSales += orderTotalAmount;
//     });

//     // Calculate top 10 selling products
//     const topSellingProducts = Object.values(productSales)
//       .sort((a, b) => b.quantity - a.quantity)
//       .slice(0, 10);

//     // Respond with calculated metrics
//     res.status(200).json({
//       totalOrders: orders.length,
//       totalDeliveredOrders: Number(totalDeliveredOrders),
//       totalDeliveredProducts: Number(totalDeliveredProducts),
//       totalNetProfit: Number(totalNetProfit),
//       todayNetProfit: Number(todayNetProfit),
//       todaySales: Number(todaySales),
//       overallSales: Number(overallSales),
//       topSellingProducts,
//     });
//   } catch (error) {
//     console.error("Error calculating metrics:", error);
//     res.status(500).json({ error: "Failed to calculate metrics." });
//   }
// };

// module.exports = {
//   calculateMetrics,
// };

const Service = require("../model/categories");
const Product = require("../model/products");
const Order = require("../model/order");

const calculateMetrics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch all orders with populated product data
    const orders = await Order.find({}).populate({
      path: "products.productId",
      select: "name FinalPrice ourprice",
    });

    // Initialize metrics
    let totalDeliveredOrders = 0;
    let totalDeliveredProducts = 0;
    let totalNetProfit = 0;
    let todayNetProfit = 0;
    let todaySales = 0;
    let overallSales = 0;

    const productSales = {};

    // Calculate metrics
    orders.forEach((order) => {
      const orderTotalAmount = Number(order.totalAmount) || 0;

      // Check if the order is delivered
      if (order.status === "Delivered") {
        totalDeliveredOrders++;
        order.products.forEach((product) => {
          const productQuantity = Number(product.quantity) || 0;
          const finalPrice = Number(product.productId?.FinalPrice) || 0;
          const ourPrice = Number(product.productId?.ourprice) || 0;

          totalDeliveredProducts += productQuantity;
          totalNetProfit += productQuantity * (finalPrice - ourPrice);

          // Track sales for top-selling products
          const productId = product.productId?._id;
          if (productId) {
            productSales[productId] = productSales[productId] || {
              name: product.productId.name,
              quantity: 0,
              totalRevenue: 0,
            };
            productSales[productId].quantity += productQuantity;
            productSales[productId].totalRevenue += productQuantity * finalPrice;
          }
        });
      }

      // Check if the order was delivered today
      if (new Date(order.deliveredAt).getTime() >= today.getTime() && order.status === "Delivered") {
        todaySales += orderTotalAmount;
        order.products.forEach((product) => {
          const productQuantity = Number(product.quantity) || 0;
          const finalPrice = Number(product.productId?.FinalPrice) || 0;
          const ourPrice = Number(product.productId?.ourprice) || 0;

          todayNetProfit += productQuantity * (finalPrice - ourPrice);
        });
      }

      // Add to overall sales
      overallSales += orderTotalAmount;
    });

    // Calculate top 10 selling products
    const topSellingProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    // Respond with calculated metrics
    res.status(200).json({
      totalOrders: orders.length,
      totalDeliveredOrders: Number(totalDeliveredOrders),
      totalDeliveredProducts: Number(totalDeliveredProducts),
      totalNetProfit: Number(totalNetProfit),
      todayNetProfit: Number(todayNetProfit),
      todaySales: Number(todaySales),
      overallSales: Number(overallSales),
      topSellingProducts,
    });
  } catch (error) {
    console.error("Error calculating metrics:", error);
    res.status(500).json({ error: "Failed to calculate metrics." });
  }
};

// const getTodayReport = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Fetch today's orders
//     const orders = await Order.find({
//       deliveredAt: { $gte: today },
//     }).populate({
//       path: "products.productId",
//       select: "name FinalPrice ourprice",
//     });

//     // Fetch today's delivered orders
//     const deliveredOrders = await Order.find({
//       deliveredAt: { $gte: today },
//       status: "Delivered",
//     }).populate({
//       path: "products.productId",
//       select: "name FinalPrice ourprice",
//     });

//     let todaySales = 0;
//     let todayNetProfit = 0;
//     let todaySoldProducts = 0;
//     const productSales = {};

//     // Calculate today's metrics
//     deliveredOrders.forEach((order) => {
//       const orderTotalAmount = Number(order.totalAmount) || 0;
//       todaySales += orderTotalAmount;

//       order.products.forEach((product) => {
//         const productQuantity = Number(product.quantity) || 0;
//         const finalPrice = Number(product.productId?.FinalPrice) || 0;
//         const ourPrice = Number(product.productId?.ourprice) || 0;

//         todaySoldProducts += productQuantity;
//         todayNetProfit += productQuantity * (finalPrice - ourPrice);

//         // Track sales for top-selling products
//         const productId = product.productId?._id;
//         if (productId) {
//           productSales[productId] = productSales[productId] || {
//             name: product.productId.name,
//             quantity: 0,
//             totalRevenue: 0,
//             netProfit: 0,
//           };
//           productSales[productId].quantity += productQuantity;
//           productSales[productId].totalRevenue += productQuantity * finalPrice;
//           productSales[productId].netProfit += productQuantity * (finalPrice - ourPrice);
//         }
//       });
//     });

//     const topSellingProducts = Object.values(productSales)
//       .sort((a, b) => b.quantity - a.quantity)
//       .slice(0, 50);

//     res.status(200).json({
//       todaySales,
//       todayNetProfit,
//       todaySoldProducts,
//       totalTodayOrders: orders.length,
//       totalTodayDeliveredOrders: deliveredOrders.length,
//       topSellingProducts,
//     });
//   } catch (error) {
//     console.error("Error fetching today's report:", error);
//     res.status(500).json({ error: "Failed to fetch today's report." });
//   }
// };

const getTodayReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch all orders placed today
    const orders = await Order.find({
      deliveredAt: { $gte: today },
    }).populate({
      path: "products.productId",
      select: "name FinalPrice ourprice",
    });

    // Fetch today's delivered orders
    const deliveredOrders = await Order.find({
      deliveredAt: { $gte: today },
      status: "Delivered",
    }).populate({
      path: "products.productId",
      select: "name FinalPrice ourprice",
    });

    let todaySales = 0;
    let todayNetProfit = 0;
    let todaySoldProducts = 0;
    const productSales = {};

    // Calculate today's metrics
    deliveredOrders.forEach((order) => {
      const orderTotalAmount = Number(order.totalAmount) || 0;
      todaySales += orderTotalAmount;

      order.products.forEach((product) => {
        const productQuantity = Number(product.quantity) || 0;
        const finalPrice = Number(product.productId?.FinalPrice) || 0;
        const ourPrice = Number(product.productId?.ourprice) || 0;

        todaySoldProducts += productQuantity;
        todayNetProfit += productQuantity * (finalPrice - ourPrice);

        // Track sales for top-selling products
        const productId = product.productId?._id;
        if (productId) {
          if (!productSales[productId]) {
            productSales[productId] = {
              name: product.productId.name,
              quantity: 0,
              totalRevenue: 0,
              netProfit: 0,
            };
          }

          productSales[productId].quantity += productQuantity;
          productSales[productId].totalRevenue += productQuantity * finalPrice;
          productSales[productId].netProfit += productQuantity * (finalPrice - ourPrice);
        }
      });
    });

    // Get top-selling products sorted by quantity sold
    const topSellingProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 50); // top 50 products

    // Respond with the report
    res.status(200).json({
      todaySales,
      todayNetProfit,
      todaySoldProducts,
      totalTodayOrders: orders.length, // Total orders placed today
      totalTodayDeliveredOrders: deliveredOrders.length, // Delivered orders today
      topSellingProducts,
    });
  } catch (error) {
    console.error("Error fetching today's report:", error);
    res.status(500).json({ error: "Failed to fetch today's report." });
  }
};

const getOverallReport = async (req, res) => {
  try {
    // Fetch all orders (including delivered ones)
    const orders = await Order.find().populate({
      path: "products.productId",
      select: "name FinalPrice ourprice",
    });

    let totalSales = 0;
    let totalNetProfit = 0;
    let totalProductsDelivered = 0;
    let totalOrders = 0;
    const productSales = {};

    // Calculate overall metrics
    orders.forEach((order) => {
      totalOrders += 1; // Count every order

      const orderTotalAmount = Number(order.totalAmount) || 0;
      totalSales += orderTotalAmount;

      order.products.forEach((product) => {
        const productQuantity = Number(product.quantity) || 0;
        const finalPrice = Number(product.productId?.FinalPrice) || 0;
        const ourPrice = Number(product.productId?.ourprice) || 0;

        totalProductsDelivered += productQuantity; // Count total products delivered
        totalNetProfit += productQuantity * (finalPrice - ourPrice); // Calculate total net profit

        // Track sales for products
        const productId = product.productId?._id;
        if (productId) {
          if (!productSales[productId]) {
            productSales[productId] = {
              name: product.productId.name,
              quantity: 0,
              totalRevenue: 0,
              netProfit: 0,
            };
          }

          productSales[productId].quantity += productQuantity;
          productSales[productId].totalRevenue += productQuantity * finalPrice;
          productSales[productId].netProfit += productQuantity * (finalPrice - ourPrice);
        }
      });
    });

    // Get top-selling products sorted by quantity sold
    const topSellingProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 50); // top 50 products

    // Respond with the overall report and top-selling products
    res.status(200).json({
      totalSales,
      totalNetProfit,
      totalProductsDelivered,
      totalOrders,
      topSellingProducts, // Return the top-selling products
    });
  } catch (error) {
    console.error("Error fetching overall report:", error);
    res.status(500).json({ error: "Failed to fetch overall report." });
  }
};





module.exports = {
  calculateMetrics,
  getTodayReport,
  getOverallReport
};
