import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        productName: String,
        productPrice: Number,
        quantity: Number,
        image: String,
      },
    ],

    // Reference to the user's address
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    // Snapshot of address at time of order
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      addressLine: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
    },

    total: {
      type: Number,
      required: true,
    },

  status: {
  type: String,
  enum: [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ],
  default: "pending",
},

paymentStatus: {
  type: String,
  enum: [
    "pending",
    "paid",
    "refunded",
  ],
  default: "pending",
},

    stripeSessionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;