// server.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/database");
const config = require("./config/config");
const errorHandler = require("./middleware/errorHandler");

const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Initialize express
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Error handling
app.use(errorHandler);

// Handle undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

mongoose.connect(process.env.MONGODB_URI);
