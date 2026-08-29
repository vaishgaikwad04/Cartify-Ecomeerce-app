import cartModel from "./cartModel.js";
import productModel from "../products/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      productId,
      productName,
      productImage,
      productPrice,
      quantity = 1,
      size,
    } = req.body;

    // Validate size
    if (!size) {
      return res.status(400).json({
        success: false,
        message: "Please select a size",
      });
    }

    // Find product
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find selected variant
    const variant = product.variants.find(
      (v) => v.size === size
    );

    if (!variant) {
      return res.status(400).json({
        success: false,
        message: "Invalid size selected",
      });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Selected size is out of stock",
      });
    }

    // Find cart
    let cart = await cartModel.findOne({ userId });

    // Create cart if not exists
    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [
          {
            productId,
            productName,
            productImage,
            productPrice,
            quantity,
            size,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Cart created successfully",
        cart,
      });
    }

    // Check if same product + same size already exists
    const productIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size
    );

    if (productIndex > -1) {
      const newQuantity =
        cart.items[productIndex].quantity + quantity;

      // Prevent exceeding stock
      if (newQuantity > variant.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${variant.stock} item(s) available in stock`,
        });
      }

      cart.items[productIndex].quantity = newQuantity;
    } else {
      cart.items.push({
        productId,
        productName,
        productImage,
        productPrice,
        quantity,
        size,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel.findOne({ userId });

    // If no cart → return empty
    if (!cart) {
      return res.json({
        message: "Cart is empty",
        items: [],
      });
    }

    res.json({
      message: "Cart fetched successfully",
      items: cart.items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateCart = async (req, res) => {
  const { productId, type } = req.body;
  const userId = req.user.id;

  const cart = await cartModel.findOne({ userId });

  const item = cart.items.find(
    (i) => i.productId.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (type === "increase") item.quantity += 1;
  if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

  await cart.save();

  res.json({ message: "Updated", items: cart.items });
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // ✅ FIXED LINE
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({
      message: "Item removed successfully",
      items: cart.items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
