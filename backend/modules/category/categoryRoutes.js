// routes/userRoutes.js
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/upload.js";
import {createCategory, fetchCategory, deleteCategory, updateCategory, getSingleCategory} from "./categoryController.js"

const router = express.Router();

router.post("/create",  upload.array("images",12),createCategory);
router.get("/fetch",fetchCategory);
router.get("/fetch/:id", getSingleCategory);
router.put("/update/:id", upload.array("images",12), updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;