const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [User]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *   put:
 *     tags: [User]
 *     summary: Update user profile
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
