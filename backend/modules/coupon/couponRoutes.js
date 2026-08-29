import express from "express";

import {
    createCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    applyCoupon,
} from "./couponController.js";


const router = express.Router();



router.post(
    "/create",
    createCoupon
);


router.get(
    "/",
    getCoupons
);


router.get(
    "/:id",
    getCouponById
);


router.put(
    "/:id",
    updateCoupon
);


router.delete(
    "/:id",
    deleteCoupon
);


router.post(
    "/apply",
    applyCoupon
);



export default router;