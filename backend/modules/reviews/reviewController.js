import reviewsModel from "./reviewsModel.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  const { rating, comment, product } = req.body;
  const userId = req.user.id;

  try {
    const createdReview = await reviewsModel.create({
      rating,
      comment,
      product,
      user: userId,
    });

    res.status(201).json({
      message: "Review created successfully",
      createdReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FETCH ALL REVIEWS - ADMIN
export const getAllReviews = async (req, res) => {
  try {
    const fetchedReviews = await reviewsModel
      .find()
      .populate("user", "name email")
      .populate("product", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All reviews fetched successfully",
      fetchedReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FETCH REVIEWS OF PARTICULAR PRODUCT
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const fetchedReview = await reviewsModel
      .find({ product: productId })
      .populate("user", "name")
      .populate("product", "name");

    res.status(200).json({
      message: "Reviews fetched successfully",
      fetchedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FETCH SINGLE REVIEW
export const fetchSingleReview = async (req, res) => {
  try {
    const { id } = req.params;

    const fetchedSingleReview = await reviewsModel.findById(id);

    if (!fetchedSingleReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review fetched successfully",
      fetchedSingleReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedReview = await reviewsModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
      deletedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE REVIEW
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { rating, comment } = req.body;

    const updatedReview = await reviewsModel.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        rating,
        comment,
      },
      {
        new: true,
      }
    );

    if (!updatedReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review updated successfully",
      updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};