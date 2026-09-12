import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToDb from "./db/config.js";

import authRoutes from "./modules/auth/authRoutes.js";
import productRoutes from "./modules/products/productRoutes.js";
import cartRoutes from "./modules/cart/cartRoutes.js";
import orderRoutes from "./modules/order/orderRoutes.js";
import wishListedItemRoutes from "./modules/wishList/whishListRoutes.js";
import categoryRoutes from "./modules/category/categoryRoutes.js";
import couponRoutes from "./modules/coupon/couponRoutes.js";
import reviewRoutes from "./modules/reviews/reviewRoutes.js";
import settingsRoutes from "./modules/settings/settingsRoutes.js";
import addressRoutes from "./modules/address/addressRoutes.js";
import notificationRoutes from "./modules/notification/notificationRoutes.js";
import dashboardRoutes from "./modules/Dashboard/dashboardRoutes.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// CORS
// ================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://peppy-quokka-eb689e.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ================================
// MIDDLEWARE
// ================================

app.use(express.json());
app.use(cookieParser());

// ================================
// DATABASE
// ================================

connectToDb();

// ================================
// ROUTES
// ================================

app.use("/auth", authRoutes);
app.use("/addToCart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/category", categoryRoutes);
app.use("/wishListedItem", wishListedItemRoutes);
app.use("/coupons", couponRoutes);
app.use("/review", reviewRoutes);
app.use("/settings", settingsRoutes);
app.use("/address", addressRoutes);
app.use("/notifications", notificationRoutes);
app.use("/dashboard", dashboardRoutes);

// ================================
// SERVER
// ================================

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});