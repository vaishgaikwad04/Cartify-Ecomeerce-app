import React, { useState, useEffect , useContext} from "react";
import {
  deleteCoupon,
  getCouponById,
  getCoupons,
} from "../../../api/user/CouponApi";
import { ThemeContext } from "../../../context/ThemeContext";

export const useCoupon = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [couponsData, setCouponsData] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountType, setDiscountType] = useState("");
  const [status, setStatus] = useState("all");

  const fetchCoupons = async () => {
    try {
      const res = await getCoupons();
      setCouponsData(res.data.coupons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  
  const fetchCouponById = async (id) => {
    try {
      const res = await getCouponById(id);
      setSelectedCoupon(res.data.coupon);
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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

  // Theme
  theme,
  isDark,
};
}

