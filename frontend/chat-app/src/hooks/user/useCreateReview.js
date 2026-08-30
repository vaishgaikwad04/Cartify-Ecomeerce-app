import { useContext, useState } from "react";
import { createReview } from "../../api/user/ReviewApi";
import { ThemeContext } from "../../context/ThemeContext";
import { NotificationContext } from "../../context/NotificationContext";

import toast from "react-hot-toast";

export const useCreateReview = ({ productId, onRefresh, onClose }) => {
  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";


  // NOTIFICATION
  const { allowNotification } = useContext(NotificationContext);

  // FORM STATE
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });


  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // RESET FORM
  const resetForm = () => {
    setFormData({
      rating: "",
      comment: "",
    });
  };

  // SUBMIT REVIEW
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        product: productId,
        rating: Number(formData.rating),
        comment: formData.comment.trim(),
      };

      await createReview(payload);

      // Success notification
      if (allowNotification) {
        toast.success("Review submitted successfully");
      }

      // Reset form after successful submission
      resetForm();

      // Refresh reviews
      if (onRefresh) {
        onRefresh();
      }

      // Close modal/form
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Review submission error:", error);

      if (allowNotification) {
        toast.error(
          error?.response?.data?.message || "Failed to submit review",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // RETURN
  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
    isDark,
    loading,
  };
};
