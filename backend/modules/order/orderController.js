
import cartModel from "../cart/cartModel.js";
import authModel from "../auth/authModel.js"
import orderModel from "./orderModel.js";
import Stripe from "stripe";
import addressModel from "../address/addressModel.js";
import notificationModel from "../notification/notificationModel.js";

// Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, addressId } = req.body;

    console.log("Products:", products);
    console.log("Address ID:", addressId);
    console.log("User ID:", req.user.id);

    // ------------------------------------------
    // VALIDATE CART
    // ------------------------------------------

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }

    // ------------------------------------------
    // VALIDATE ADDRESS ID
    // ------------------------------------------

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Address is required.",
      });
    }

    // ------------------------------------------
    // FETCH USER ADDRESS
    // ------------------------------------------

    const address = await addressModel.findOne({
      _id: addressId,
      userId: req.user.id,
    });

    console.log("Selected Address:", address);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    // ------------------------------------------
    // CALCULATE TOTAL
    // ------------------------------------------

    const total = products.reduce(
      (sum, product) =>
        sum + product.price * product.quantity,
      0
    );

    // ------------------------------------------
    // STRIPE LINE ITEMS
    // ------------------------------------------

    const line_items = products.map((product) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name: product.name,
          images: product.img
            ? [product.img]
            : [],
        },

        unit_amount: Math.round(
          product.price * 100
        ),
      },

      quantity: product.quantity,
    }));

    // ------------------------------------------
    // CREATE STRIPE SESSION
    // ------------------------------------------

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        mode: "payment",

        line_items,

        success_url:
          "http://localhost:5173/success",

        cancel_url:
          "http://localhost:5173/cancel",

        metadata: {
          userId: req.user.id,
          addressId: address._id.toString(),
        },
      });

    // ------------------------------------------
    // CREATE ORDER
    // ------------------------------------------

    const order = await orderModel.create({
      userId: req.user.id,

      // Address reference
      addressId: address._id,

      // Save address snapshot
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      },

      // Order items
      items: products.map((product) => ({
        productId: product.productId,
        productName: product.name,
        productPrice: product.price,
        quantity: product.quantity,
        image: product.img || "",
      })),

      total: total,

      status: "pending",

      paymentStatus: "pending",

      stripeSessionId: session.id,
    });

    console.log(
      "Order created:",
      order._id
    );

    // ------------------------------------------
    // RESPONSE
    // ------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Checkout session created successfully",

      id: session.id,

      url: session.url,

      orderId: order._id,
    });
  } catch (error) {
    console.log(
      "Stripe / Order Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    console.log("JWT USER ID:", req.user.id);

    const fetchedOrder = await orderModel
      .find({
        userId: req.user.id,
      })
      .populate("userId", "name email")
      .populate("addressId");

    console.log("MATCHED ORDERS:", fetchedOrder);

    res.status(200).json({
      message: "Order fetched successfully!",
      fetchedOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find().populate("userId", "name email");

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      allOrders,
    });
  } catch (error) {
    console.log("Get All Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    console.log("========== UPDATE ORDER ==========");
    console.log("ORDER ID:", req.params.id);
    console.log("BODY:", req.body);

    const updateData = {};

    // ------------------------------------------
    // UPDATE ORDER STATUS
    // ------------------------------------------

    if (status !== undefined && status !== "") {
      updateData.status = status;
    }

    // ------------------------------------------
    // UPDATE PAYMENT STATUS
    // ------------------------------------------

    if (
      paymentStatus !== undefined &&
      paymentStatus !== ""
    ) {
      updateData.paymentStatus = paymentStatus;
    }

    console.log("UPDATE DATA:", updateData);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    // ------------------------------------------
    // UPDATE ORDER
    // ------------------------------------------

    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("UPDATED ORDER:", order);

    // ==========================================
    // CREATE NOTIFICATION
    // ==========================================

    if (status === "paid") {
      await notificationModel.create({
        user: order.userId,
        title: "Payment Successful",
        message:
          "Your payment was successful and your order has been confirmed.",
        type: "payment",
        order: order._id,
      });

      console.log("Payment notification created");
    }

    if (status === "shipped") {
      await notificationModel.create({
        user: order.userId,
        title: "Order Shipped",
        message:
          "Your order has been shipped and is on its way.",
        type: "shipping",
        order: order._id,
      });

      console.log("Shipping notification created");
    }

    if (status === "delivered") {
      await notificationModel.create({
        user: order.userId,
        title: "Order Delivered",
        message:
          "Your order has been delivered successfully.",
        type: "delivery",
        order: order._id,
      });

      console.log("Delivery notification created");
    }

    if (status === "cancelled") {
      await notificationModel.create({
        user: order.userId,
        title: "Order Cancelled",
        message:
          "Your order has been cancelled.",
        type: "order",
        order: order._id,
      });

      console.log("Cancellation notification created");
    }

    console.log("=================================");

    // ------------------------------------------
    // RESPONSE
    // ------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });

  } catch (error) {
    console.error(
      "UPDATE ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};





export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      addressLine,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    console.log("========== UPDATE CUSTOMER ==========");
    console.log("CUSTOMER ID:", id);
    console.log("BODY:", req.body);

    // ------------------------------------------
    // FIND CUSTOMER THROUGH ORDERS
    // ------------------------------------------

    const orders = await orderModel
      .find({ userId: id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // ------------------------------------------
    // UPDATE NAME + EMAIL
    // These fields belong to auth/user collection
    // ------------------------------------------

    const updatedUser = await authModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("name email");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ------------------------------------------
    // UPDATE CUSTOMER ADDRESS
    // Order contains shippingAddress snapshot
    // ------------------------------------------

    await orderModel.updateMany(
      { userId: id },
      {
        $set: {
          "shippingAddress.fullName": name,
          "shippingAddress.phone": phone,
          "shippingAddress.addressLine": addressLine,
          "shippingAddress.city": city,
          "shippingAddress.state": state,
          "shippingAddress.postalCode": postalCode,
          "shippingAddress.country": country,
        },
      }
    );

    // ------------------------------------------
    // GET UPDATED CUSTOMER
    // ------------------------------------------

    const updatedOrders = await orderModel
      .find({ userId: id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    // ------------------------------------------
    // RESPONSE
    // ------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",

      customer: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,

        // Latest order contains latest address
        address: updatedOrders[0]?.shippingAddress || null,

        orders: updatedOrders,
      },
    });
  } catch (error) {
    console.error("UPDATE CUSTOMER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};