          import wishlistModel from "./wishListModel.js";


export const createWishListedItem = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const productExist = await wishlistModel.findOne({
            userId,
            productId,
        });

        if (productExist) {
            return res.status(200).json({
                message: "Product already wishlisted",
            });
        }

        const wishlistedItem = await wishlistModel.create({
            userId,
            productId,
        });

        res.status(201).json({
            message: "Product added to wishlist",
            wishlistedItem,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getWishListedItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlistedItems = await wishlistModel
      .find({ userId })
      .populate("productId");

    res.status(200).json({
      success: true,
      wishlistedItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const removeWishListedItem = async (req, res) => {
    try {
        const { id } = req.params;

        const removedWishListedItem = await wishlistModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "WishListed Item deleted successfully",
            removedWishListedItem,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};