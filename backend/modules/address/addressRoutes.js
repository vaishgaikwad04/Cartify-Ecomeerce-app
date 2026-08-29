import express from "express";

import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "./addressController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create address
router.post("/", authMiddleware, createAddress);

// Get all addresses of logged-in user
router.get("/", authMiddleware, getAddresses);

// Get single address
router.get("/:id", authMiddleware, getAddressById);

// Update address
router.put("/:id", authMiddleware, updateAddress);

// Delete address
router.delete("/:id", authMiddleware, deleteAddress);

// Set address as default
router.patch(
  "/:id/default",
  authMiddleware,
  setDefaultAddress
);

export default router;