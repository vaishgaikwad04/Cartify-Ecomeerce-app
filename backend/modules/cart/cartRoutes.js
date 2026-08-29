// routes/userRoutes.js
import express from "express";
import { addToCart, getCart,  removeFromCart, updateCart } from "./cartController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";


const router = express.Router();


router.post("/add", authMiddleware, addToCart);
router.get("/get", authMiddleware, getCart);
router.put("/update", authMiddleware, updateCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);




export default router;