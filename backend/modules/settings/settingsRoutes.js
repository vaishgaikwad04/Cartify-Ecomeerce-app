// routes/reviewRoutes.js

import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { updateSettings, getUserSettings, getAdminSettings } from "./settingsController.js";

const router = express.Router();

router.get("/user",authMiddleware, getUserSettings);
router.get("/admin",authMiddleware, getAdminSettings);
router.put("/", authMiddleware, updateSettings);

export default router;