import React, { useState, useEffect, useContext } from "react";
import { createCouponApi, updateCoupon } from "../../../api/user/CouponApi";
import { ThemeContext } from "../../../context/ThemeContext";
import toast from "react-hot-toast";

const initialState = {
  code: "",
  discount: "",
  discountType: "percentage",
  minOrderAmount: "",
  expiryDate: "",
  isActive: true,
};

export const useCreateCoupon = ({
  onRefresh,
  selectedCoupon,
  setIsModalOpen,
  setSelectedCouponId,
  setSelectedCoupon
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (selectedCoupon) {
      setFormData({
        code: selectedCoupon.code || "",
        discount: selectedCoupon.discount || "",
        discountType: selectedCoupon.discountType || "percentage",
        minOrderAmount: selectedCoupon.minOrderAmount || "",
        expiryDate: selectedCoupon.expiryDate
          ? selectedCoupon.expiryDate.split("T")[0]
          : "",
        isActive: selectedCoupon.isActive,
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedCoupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const payload = {
    ...formData,
    discount: Number(formData.discount),
    minOrderAmount: Number(formData.minOrderAmount),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCoupon) {
        await updateCoupon(selectedCoupon._id, payload);
        toast.success("Coupon Updated Successfully");
      } else {
        await createCouponApi(payload);
        toast.success("Coupon Created Successfully");
      }
      setIsModalOpen(false);
      setSelectedCoupon(null);
      setSelectedCouponId(null);
      onRefresh();
      setFormData(initialState);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    payload,
    isDark,
    theme,
  };
};
