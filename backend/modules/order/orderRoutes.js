import express from "express";
import {
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
   updateCustomer,
  //updateOrderStatus,
  //cancelOrder,
  createCheckoutSession,
} from "./orderController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.get("/all", authMiddleware, getOrdersByUserId);
router.get("/", authMiddleware, getAllOrders);
router.patch(
  "/:id/status",

  updateOrderStatus,
);

router.patch(
  "/customer/:id",
  authMiddleware,
  updateCustomer
);

//router.put( "/update-status/:id" updateOrderStatus);

//router.put("/cancel/:id", cancelOrder);

export default router;
