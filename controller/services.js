const Category = require("../model/categories");
const Product = require("../model/products");
const Subcategory = require("../model/subcategories");
const createService = async (req, res) => {
  try {
    const { name, subcategorieslist, image } = req.body;

    // Create the main category
    const category = await Category.create({
      name,
      image,
    });
    // Add subcategories with positionId
    if (subcategorieslist && subcategorieslist.length > 0) {
      for (let subcategory of subcategorieslist) {
        await Subcategory.create({
          categoriesId: category._id,
          name: subcategory.name,
          image: subcategory.image,
          positionId: subcategory.positionId, // Include positionId
        });
      }
    }

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params; // Extract the service ID from the URL parameters.
    const { name, image, active, poistionId } = req.body; // Extract updated fields from the request body.
    // Update the service in the database and return the updated document.
    const service = await Category.findByIdAndUpdate(
      id,
      { name, image, active, poistionId },
      { new: true } // Ensures the returned document is the updated version.
    );

    res.status(200).json(service); // Respond with the updated service.
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with an error message.
  }
};

const getAllServices = async (req, res, next) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    // Fetch subcategories for the retrieved categories
    const subcategories = await Subcategory.find({
      categoriesId: { $in: categories.map((cat) => cat._id) }, // Match subcategories with categories
    });

    // Organize subcategories by category ID
    const subcategoriesByCategory = subcategories.reduce((acc, sub) => {
      (acc[sub.categoriesId] = acc[sub.categoriesId] || []).push(sub);
      return acc;
    }, {});

    // Attach subcategories to their respective categories
    const categoriesWithSubcategories = categories.map((category) => ({
      ...category.toObject(),
      subcategories: subcategoriesByCategory[category._id] || [],
    }));

    res.status(200).json({
      success: true,
      totalCategories: categories.length, // Return the count of categories
      categories: categoriesWithSubcategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllServicesforuser = async (req, res) => {
  try {
    const services = await Category.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getsubcatogorybycatogeyname = async (req, res) => {
  try {
    const { name } = req.params;

    // Find the Category by its name
    const category = await Category.findOne({ name: name });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find Subcategories based on the category's ObjectId and sort by positionId
    const subcategories = await Subcategory.find({ categoriesId: category._id })
      .sort({ positionId: 1 }); // 1 for ascending order, -1 for descending order

    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getservicebyid = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Category.findById(id);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchServices = async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    const services = await Category.find({
      name: { $regex: new RegExp(name, "i") },
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// product

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({ products, totalProducts: products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getproductsbyserviceid = async (req, res) => {
  try {
    const { name } = req.params;

    // Case insensitive search for service by name
    const service = await Category.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (!service) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Finding products by category ID
    const products = await Product.find({
      category: service._id,
      active: "true",
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { name, category } = req.query;

    // Build search query based on parameters
    let searchCriteria = { active: "true" }; // Default search for active products

    // If both name and category are provided
    if (name && category) {
      const service = await Category.findOne({
        name: { $regex: new RegExp("^" + category + "$", "i") },
      });

      if (service) {
        searchCriteria = {
          ...searchCriteria,
          name: { $regex: new RegExp(name, "i") },
          category: service._id,
        };
      } else {
        searchCriteria = {
          ...searchCriteria,
          name: { $regex: new RegExp(name, "i") },
        };
      }
    }
    // If only name is provided
    else if (name) {
      searchCriteria = {
        ...searchCriteria,
        name: { $regex: new RegExp(name, "i") },
      };
    }
    // If only category is provided
    else if (category) {
      const service = await Category.findOne({
        name: { $regex: new RegExp("^" + category + "$", "i") },
      });

      if (service) {
        searchCriteria = { ...searchCriteria, category: service._id };
      } else {
        // If category doesn't exist, return products from all categories
        searchCriteria = { ...searchCriteria };
      }
    }

    const products = await Product.find(searchCriteria).populate("category");

    res.status(200).json({ products, totalProducts: products.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getproductsbyserviceid,
  deleteService,
  updateService,
  getAllServicesforuser,
  getsubcatogorybycatogeyname,



  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  getservicebyid,
  searchProducts,
  searchServices,
};
