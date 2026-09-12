import React, { useState, useEffect, useContext } from "react";
import {
  deleteCoupon,
  getCouponById,
  getCoupons,
} from "../../../api/user/CouponApi";
import { ThemeContext } from "../../../context/ThemeContext";
import toast from "react-hot-toast";

export const useCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [couponsData, setCouponsData] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [viewCoupon, setViewCoupon] = useState(null);
  const [discountType, setDiscountType] = useState("");
  const [status, setStatus] = useState("all");
  const [viewModelOpen, setViewModelOpen] = useState(false);

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons();
      setCouponsData(res.data.coupons);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to Fetched  Coupon");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCouponById = async (id) => {
    try {
      const res = await getCouponById(id);
      setSelectedCoupon(res.data.coupon);
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to Fetched  Coupon By Id",
      );
    }
  };

  useEffect(() => {
    if (selectedCouponId) {
      fetchCouponById(selectedCouponId);
    }
  }, [selectedCouponId]);

  const handleEditCoupon = (id) => {
    setIsModalOpen(true);
    setSelectedCouponId(id);
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await deleteCoupon(id);
      fetchCoupons();
    } catch (error) {
      toast.error(error.response.data.message || "Failed to Delete  Coupon");
    }
  };

  const filteredCoupons = couponsData
    .filter((item) =>
      !search ? true : item.code.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((item) =>
      discountType === "" || discountType === "all"
        ? true
        : item.discountType === discountType,
    )
    .filter((item) =>
      status === "all" ? true : item.isActive === (status === "true"),
    );

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

 const handleViewCoupon = (id) => {
  const coupon = couponsData.find((item) => item._id === id);

  setViewModelOpen(true);
  setViewCoupon(coupon);
};

  return {
    // Modal
    isModalOpen,
    setIsModalOpen,

    // Search
    search,
    setSearch,

    // Coupons
    couponsData,
    setCouponsData,

    // Selected coupon
    selectedCouponId,
    setSelectedCouponId,
    selectedCoupon,
    setSelectedCoupon,

    // Filters
    discountType,
    setDiscountType,
    status,
    setStatus,

    // Functions
    fetchCoupons,
    fetchCouponById,
    handleEditCoupon,
    handleDeleteCoupon,

    // Filtered data
    filteredCoupons,
    handleViewCoupon,
    setViewModelOpen,
    viewModelOpen,
    // Theme
    theme,
    isDark,
    viewCoupon
  };
};
