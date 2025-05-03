const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { adminOnly, staffOnly } = require('../middlewares/authorization');

router.get("/", staffOnly, productController.getAllProducts);
router.get("/:code", staffOnly, productController.getProduct);
router.post("/", staffOnly, productController.createProduct);
router.put("/:code", adminOnly, productController.updateProduct);
router.delete("/:code", adminOnly, productController.deleteProduct);

module.exports = router;
