import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";

import {
  createReview,
  getProductReviews,
  fetchSingleReview,
  updateReview,
  deleteReview,
  getAllReviews,
} from "./reviewController.js";

const router = express.Router();

router.get("/all", getAllReviews);
router.post("/create", authMiddleware, createReview);
router.get("/singleReview/:id", fetchSingleReview);

// Fetch reviews by product id
router.get("/:productId", getProductReviews);

router.put("/:id", authMiddleware, updateReview);

router.delete("/:id", authMiddleware, deleteReview);

export default router;