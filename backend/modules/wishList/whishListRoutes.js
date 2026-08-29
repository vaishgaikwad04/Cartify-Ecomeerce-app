// routes/userRoutes.js
import express from "express";
import {createWishListedItem, getWishListedItems, removeWishListedItem} from "./wishListController.js"
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware,createWishListedItem);
router.get("/", authMiddleware, getWishListedItems);
router.delete("/delete/:id", removeWishListedItem);


export default router;