
import express from "express";
import {getHello } from "./dashboardController.js";

const router = express.Router();

router.get("/search", getHello);

export default router;
