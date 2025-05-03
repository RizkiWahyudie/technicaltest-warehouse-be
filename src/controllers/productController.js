const productModel = require("../models/productModel");
// const redisClient = require('../utils/redis');

const getAllProducts = async (req, res, next) => {
  try {
    // Check cache first
    // const cachedProducts = await redisClient.get('allProducts');
    // if (cachedProducts) {
    //   return res.json(JSON.parse(cachedProducts));
    // }

    const products = await productModel.getAllProducts();

    // Cache the result for 1 hour
    // await redisClient.set('allProducts', JSON.stringify(products), { EX: 3600 });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Check cache first
    // const cachedProduct = await redisClient.get(`product:${code}`);
    // if (cachedProduct) {
    //   return res.json(JSON.parse(cachedProduct));
    // }

    const product = await productModel.getProductByCode(code);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Cache the result for 1 hour
    // await redisClient.set(`product:${code}`, JSON.stringify(product), { EX: 3600 });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;

    // Basic validation
    if (
      !productData.code ||
      !productData.name ||
      !productData.weight ||
      !productData.unit_of_measurement ||
      !productData.category
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingProduct = await productModel.getProductByCode(
      productData.code
    );
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this code already exists" });
    }

    const newProduct = await productModel.createProduct(productData);

    // Invalidate cache
    // await redisClient.del('allProducts');

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { code } = req.params;
    const productData = req.body;

    const existingProduct = await productModel.getProductByCode(code);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await productModel.updateProduct(code, productData);

    // Invalidate cache
    // await redisClient.del('allProducts');
    // await redisClient.del(`product:${code}`);

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { code } = req.params;

    const existingProduct = await productModel.getProductByCode(code);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productModel.deleteProduct(code);

    // Invalidate cache
    // await redisClient.del('allProducts');
    // await redisClient.del(`product:${code}`);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
