// routes/userRoutes.js
import express from "express";
import { createProduct, fetchProduct, fetchProductBasedOnCategory ,getProductsByBrand , deleteProduct, updateProduct, getProductById,getDashboardStats, handleToggle, searchProducts } from "./productController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

router.post("/create",  upload.array("images",12),createProduct);
router.get("/fetch",fetchProduct);
router.get('/fetch/:category', fetchProductBasedOnCategory)
router.get("/getSingleProduct/:id",getProductById);
router.put("/update/:id", upload.array("images",12), updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/stats", getDashboardStats);
router.put("/toggle/:id",handleToggle);
router.get("/search", searchProducts);
router.get("/brand", getProductsByBrand);

export default router;