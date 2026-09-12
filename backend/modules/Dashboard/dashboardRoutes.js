
import express from "express";
import {getSearchItem } from "./dashboardController.js";

const router = express.Router();

router.get("/search", getSearchItem);

export default router;
