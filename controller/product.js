const Category = require("../model/categories");
const Product = require("../model/products");
const Subcategory = require("../model/subcategories");


const getproductsbysubcategoryName = async (req, res) => {
    try {
      const { name } = req.params;
  
      // Find the Subcategory by its name
      const subcategory = await Subcategory.findOne({ name: name });
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
  
      // Find products based on the subcategory's ObjectId
      const products = await Product.find({ subcategory: subcategory._id });  // Updated field name here
  
      if (products.length === 0) {
        return res.status(404).json({ error: "No products found for this subcategory" });
      }
  
      res.status(200).json({products});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

module.exports = {
    getproductsbysubcategoryName
}