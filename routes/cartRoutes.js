const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.post("/", addToCart);
router.get("/", getCart);

module.exports = router;

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get user's cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details
 *   post:
 *     tags: [Cart]
 *     summary: Add item to cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart
 */
