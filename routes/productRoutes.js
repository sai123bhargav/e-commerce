const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 5),
  createProduct
);

module.exports = router;

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */
