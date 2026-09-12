import cartModel from "./cartModel.js";
import productModel from "../products/productModel.js";

// =========================
// ADD TO CART
// =========================
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

    // Validate required fields
    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Product and size are required",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
      message: "Quantity cannot be less than 0",
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
        message: `Size ${size} is not available for this product`,
      });
    }

    // Check stock
    if (variant.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: `Size ${size} is out of stock`,
      });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${variant.stock} item(s) available in stock`,
      });
    }

    // Find user's cart
    let cart = await cartModel.findOne({ userId });

    // Create cart if it doesn't exist
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
        message: "Product added to cart successfully",
        cart,
      });
    }

    // Check same product + same size
    const productIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size
    );

    // If item already exists
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
      // Add new product/size combination
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

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add product to cart. Please try again.",
    });
  }
};


// =========================
// GET CART
// =========================
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await cartModel.findOne({ userId });

    // No cart
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        items: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      items: cart.items,
    });
  } catch (error) {
    console.error("Get Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch cart. Please try again.",
      items: [],
    });
  }
};


// =========================
// UPDATE CART
// =========================
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, type } = req.body;

    // Validate request
    if (!productId || !size || !type) {
      return res.status(400).json({
        success: false,
        message: "Product, size and update type are required",
      });
    }

    if (!["increase", "decrease"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid update type",
      });
    }

    // Find cart
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find cart item using product + size
    const item = cart.items.find(
      (i) =>
        i.productId.toString() === productId &&
        i.size === size
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
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
        message: `Size ${size} is no longer available`,
      });
    }

    // Increase quantity
    if (type === "increase") {
      if (item.quantity >= variant.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${variant.stock} item(s) available in stock`,
        });
      }

      item.quantity += 1;
    }

    // Decrease quantity
    if (type === "decrease") {
      if (item.quantity <= 1) {
        return res.status(400).json({
          success: false,
          message: "Quantity cannot be less than 1",
        });
      }

      item.quantity -= 1;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message:
        type === "increase"
          ? "Quantity increased successfully"
          : "Quantity decreased successfully",
      items: cart.items,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update cart. Please try again.",
    });
  }
};


// =========================
// REMOVE FROM CART
// =========================
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { size } = req.query;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!size) {
      return res.status(400).json({
        success: false,
        message: "Size is required",
      });
    }

    // Find cart
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Check item exists
    const itemExists = cart.items.some(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Remove product + size combination
    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.size === size
        )
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      items: cart.items,
    });
  } catch (error) {
    console.error("Remove From Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to remove product from cart. Please try again.",
    });
  }
};