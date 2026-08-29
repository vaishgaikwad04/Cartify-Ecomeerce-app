// modules/auth/authRoutes.js

import express from "express";

import {
  loginUser,
  registerUser,
  logout,
} from "./authController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// ================================
// AUTH
// ================================

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);



export default router;