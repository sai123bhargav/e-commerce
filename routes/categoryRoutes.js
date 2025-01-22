const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", getCategories);
router.post("/", protect, authorize("admin"), createCategory);

module.exports = router;

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
