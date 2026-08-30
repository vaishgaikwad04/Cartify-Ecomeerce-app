import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../api/user/CartApi";
import { fetchSingleProduct } from "../../api/user/ProductApi";
import { NotificationContext } from "../../context/NotificationContext";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";
import {
  deleteReview,
  fetchReview,
  fetchSingleReview,
} from "../../api/user/ReviewApi";

export const useDescription = () => {
  // Get product ID from the URL
  const { id } = useParams();

  // Get the logged-in user's ID
  const currentUserId = localStorage.getItem("userId");

  // Get current theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Get notification permission
  const { allowNotification } = useContext(NotificationContext);

  // Product state
  const [product, setProduct] = useState(null);

  // Selected product size
  const [selectedSize, setSelectedSize] = useState("");

  // Review states
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedReview, setSelectedReview] = useState("");

  // Fetch product details
  const getProduct = async () => {
    try {
      const res = await fetchSingleProduct(id);

      setProduct(res?.data?.product);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch product whenever the product ID changes
  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  // Find the currently selected variant
  const selectedVariant = product?.variants?.find(
    (variant) => variant.size === selectedSize,
  );

  // Fetch reviews for the current product
  const fetchReviews = async (productId) => {
    try {
      const res = await fetchReview(productId);

      console.log(res.data);

      setReviews(res.data.fetchedReview || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch reviews whenever the product is available
  useEffect(() => {
    if (product?._id) {
      fetchReviews(product._id);
    }
  }, [product?._id]);

  // Scroll to the top whenever the product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // Add product to cart
  const handleAddToCart = async () => {
    try {
      // Check whether product exists
      if (!product?._id) {
        return {
          success: false,
          message: "Product not found",
        };
      }

      // Check whether product has variants
      const hasVariants =
        Array.isArray(product.variants) && product.variants.length > 0;

      // Require size when variants are available
      if (hasVariants && !selectedSize) {
        return {
          success: false,
          message: "Please select a size",
        };
      }

      // Validate selected variant
      if (hasVariants) {
        if (!selectedVariant) {
          return {
            success: false,
            message: "Please select a size",
          };
        }

        // Check selected variant stock
        if (selectedVariant.stock <= 0) {
          return {
            success: false,
            message: "Selected size is out of stock",
          };
        }
      }

      // Prepare cart data
      const cartData = {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0] || "",
        productPrice: product.discountPrice || product.price,
        quantity: 1,

        // Add size only when product has variants
        ...(hasVariants && {
          size: selectedSize,
        }),
      };

      console.log("ADDING TO CART:", cartData);

      // Add product to cart
      const res = await addToCart(cartData);

      console.log("ADD CART RESPONSE:", res?.data);

      // Refresh product data
      await getProduct();

      // Reset selected size
      setSelectedSize("");

      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error?.response?.data || error.message,
      );

      return {
        success: false,
        message:
          error?.response?.data?.message || "Unable to add product to cart",
      };
    }
  };

  // Handle cart button and show notification
  const handleCart = async () => {
    const result = await handleAddToCart();

    if (!result) return;

    if (result.success) {
      if (allowNotification) {
        toast.success(result.message);
      }
    } else {
      toast.error(result.message);
    }
  };

  // Delete a review
  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);

      if (product?._id) {
        fetchReviews(product._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open the edit review modal
  const handleUpdate = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsReviewModalOpen(true);
  };

  // Fetch a single review
  const getSingleReview = async () => {
    try {
      const res = await fetchSingleReview(selectedReviewId);

      setSelectedReview(res.data.fetchedSingleReview);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch selected review when its ID changes
  useEffect(() => {
    if (selectedReviewId) {
      getSingleReview();
    }
  }, [selectedReviewId]);

  // Calculate final product price
  const finalPrice = product?.discountPrice || product?.price;

  // Calculate discount amount
  const discount = product?.discountPrice
    ? product.price - product.discountPrice
    : 0;

  // Return all required data and functions
  return {
    product,
    getProduct,

    selectedSize,
    setSelectedSize,
    selectedVariant,

    handleAddToCart,
    handleCart,

    finalPrice,
    discount,

    isDark,
    currentUserId,

    reviews,
    fetchReviews,

    isReviewModalOpen,
    setIsReviewModalOpen,

    selectedReviewId,
    selectedReview,

    handleDelete,
    handleUpdate,
  };
};
