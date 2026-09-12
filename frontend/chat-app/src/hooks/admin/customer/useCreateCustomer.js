import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { updateCustomer } from "../../../api/user/OrderApi";
import toast from "react-hot-toast";

export const useUpdateCustomer = ({user, onClose, onRefresh}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Fill form when selected customer changes
  useEffect(() => {
    if (!user) return;
    const newFormData = {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || user?.address?.phone || "",
      addressLine: user?.address?.addressLine || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      postalCode: user?.address?.postalCode || "",
      country: user?.address?.country || "",
    };
    setFormData(newFormData);
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const res = await updateCustomer(user?._id, formData);
      setSuccess(res?.data?.message || "Customer updated successfully.");
      toast.success(res?.data?.message || "Customer updated successfully.");
      if (onRefresh) {
        await onRefresh();
      }
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update customer.");
      setError(error?.response?.data?.message || "Unable to update customer.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // Theme
    isDark,

    // Form
    formData,
    handleChange,
    handleSubmit,

    // Messages
    error,
    success,

    // Loading
    loading,
  };
};
