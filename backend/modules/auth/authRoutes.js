// modules/auth/authRoutes.js

import express from "express";

import {
  loginUser,
  registerUser,
  logout,
  getCurrentUser,
  googleLogin,
} from "./authController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// ================================
// AUTH
// ================================

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/logout", logout);

router.get("/me", authMiddleware, getCurrentUser);



export default router;