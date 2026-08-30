// modules/auth/authRoutes.js

import express from "express";

import {
  loginUser,
  registerUser,
  logout,
  getCurrentUser,
} from "./authController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// ================================
// AUTH
// ================================

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

router.get("/me", authMiddleware, getCurrentUser);



export default router;