import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  details: String,
  careFit: String,
  category: String,
   brand: {
    type: String,
    required: true,
  },
  images: [],

  price: Number,
  discountPrice: Number,

  quantity: Number,
  isOnSale: Boolean,

 variants: [
    {
      size: { type: String },
      color: { type: String },
      stock: { type: Number, default: 0 },
      sku: { type: String }, 
    },
  ],
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
