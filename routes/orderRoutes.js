const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.post("/", createOrder);
router.get("/", getOrders);

module.exports = router;

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get user's orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     tags: [Orders]
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: object
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
