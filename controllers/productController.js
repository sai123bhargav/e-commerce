const Product = require('../models/productModel');

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    // Check if a category is provided in the request parameters
    const { category } = req.params;

    let products;
    if (category) {
      // If a category is provided, filter products by category name
      products = await Product.find({ category }).populate('category');
      
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: `No products found for category "${category}"`,
        });
      }
    } else {
      // If no category is provided, return all products
      products = await Product.find().populate('category');
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};


exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};