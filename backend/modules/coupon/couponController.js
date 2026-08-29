import Coupon from "./couponModel.js";


// CREATE COUPON

export const createCoupon = async (req, res) => {
  try {

    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ALL COUPONS

export const getCoupons = async (req, res) => {

  try {

    const coupons = await Coupon.find();

    res.status(200).json({
      success: true,
      coupons,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET SINGLE COUPON

export const getCouponById = async (req, res) => {

  try {

    const coupon = await Coupon.findById(req.params.id);


    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }


    res.status(200).json({
      coupon,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// UPDATE COUPON

export const updateCoupon = async (req, res) => {

  try {

    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );


    res.status(200).json({
      message: "Coupon updated",
      coupon,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// DELETE COUPON

export const deleteCoupon = async (req, res) => {

  try {

    await Coupon.findByIdAndDelete(req.params.id);


    res.status(200).json({
      message: "Coupon deleted",
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// APPLY COUPON
export const applyCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid coupon",
      });
    }

    if (!coupon.isActive) {
      return res.status(400).json({
        message: "Coupon is inactive",
      });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({
        message: "Coupon expired",
      });
    }

    if (cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }

    const discountAmount =
      (cartTotal * coupon.discount) / 100;

    const finalAmount =
      cartTotal - discountAmount;

    return res.status(200).json({
      success: true,
      discountAmount,
      finalAmount,
      coupon,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};                                                                                                                                                                          