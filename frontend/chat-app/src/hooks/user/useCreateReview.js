import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";

import { createReview, updateReview } from "../../api/user/ReviewApi";

export const useCreateReview = ({
  productId,
  reviewData,
  onRefresh,
  onClose,
}) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  // IMPORTANT:
  // Fill the form when editing
  useEffect(() => {
    if (reviewData?._id) {
      console.log("SETTING EDIT FORM:", reviewData);

      setFormData({
        rating: reviewData.rating ?? "",
        comment: reviewData.comment ?? "",
      });
    } else {
      // New review
      setFormData({
        rating: "",
        comment: "",
      });
    }
  }, [reviewData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rating) {
      toast.error("Please enter a rating");
      return;
    }

    if (Number(formData.rating) < 1 || Number(formData.rating) > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setLoading(true);

      let res;

      if (reviewData?._id) {
        // EDIT
        res = await updateReview(reviewData._id, {
          rating: Number(formData.rating),
          comment: formData.comment,
        });
      } else {
        // CREATE
        res = await createReview({
          product: productId,
          rating: Number(formData.rating),
          comment: formData.comment,
        });
      }

      console.log("REVIEW RESPONSE:", res?.data);

      toast.success(
        reviewData?._id
          ? "Review updated successfully"
          : "Review submitted successfully",
      );

      // Refresh review list
      if (onRefresh) {
        await onRefresh();
      }

      // Close modal
      if (onClose) {
        onClose();
      }

      // Reset form
      setFormData({
        rating: "",
        comment: "",
      });
    } catch (error) {
      console.error("REVIEW ERROR:", error?.response?.data || error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isDark,
    loading,
  };
};
