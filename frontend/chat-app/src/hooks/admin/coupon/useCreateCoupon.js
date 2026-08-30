import React, { useState, useEffect, useContext } from "react";
import { createCouponApi, updateCoupon } from "../../../api/user/CouponApi";
import { ThemeContext } from "../../../context/ThemeContext";

const initialState = {
  code: "",
  discount: "",
  discountType: "percentage",
  minOrderAmount: "",
  expiryDate: "",
  isActive: true,
};

export const useCreateCoupon = ({ onRefresh, selectedCoupon }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!selectedCoupon) return;
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
        alert("Coupon Updated Successfully");
      } else {
        await createCouponApi(payload);
        alert("Coupon Created Successfully");
      }
      onRefresh();
      setFormData(initialState);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
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
