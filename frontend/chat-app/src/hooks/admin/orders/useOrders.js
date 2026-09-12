import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../api/user/OrderApi";
import toast from "react-hot-toast";

export const useOrders = () => {
  // Get current theme
  const { theme } = useContext(ThemeContext);

  // Check whether dark mode is active
  const isDark = theme === "Dark Mode";

  // Store all orders
  const [orderData, setOrderData] = useState([]);

  // Search and filter states
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Selected order for manage modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Manage modal state
  const [showManageModal, setShowManageModal] = useState(false);

  // Order status selected in modal
  const [orderStatus, setOrderStatus] = useState("");

  // Payment status selected in modal
  const [paymentStatus, setPaymentStatus] = useState("");

  // Update loading state
  const [updatingStatus, setUpdatingStatus] = useState(false);


  // FETCH ORDERS
  const fetchedOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrders();
      setOrderData(res?.data?.allOrders || []);
    } catch (error) {
     toast.error(
        "Order fetch error:",
        error?.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when page loads
  useEffect(() => {
    fetchedOrders();
  }, []);

  
  // OPEN MANAGE ORDER MODAL
  const handleManageOrder = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order?.status || "processing");
    setPaymentStatus(order?.paymentStatus || "pending");
    setShowManageModal(true);
  };

 // UPDATE ORDER STATUS
  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      setUpdatingStatus(true);
      const res = await updateOrderStatus(
        selectedOrder._id,
        orderStatus,
        paymentStatus
      );

      toast.success(res?.data?.message);

      // Update order in local state
      setOrderData((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? {
                ...order,
                status: orderStatus,
                paymentStatus: paymentStatus,
              }
            : order
        )
      );

      // Update selected order
      setSelectedOrder((prev) => ({
        ...prev,
        status: orderStatus,
        paymentStatus: paymentStatus,
      }));

      // Close modal
      setShowManageModal(false);
    } catch (error) {
      toast.error(
        "Update order error:",
        error?.response?.data || error
      );
    } finally {
      setUpdatingStatus(false);
    }
  };


  // FILTER ORDERS
  const filteredData = orderData
    // Search
    .filter((item) => {
      if (!search) {
        return true;
      }

      const searchValue = search.toLowerCase();

      const orderId = item?._id?.toLowerCase() || "";

      const customerName =
        item?.userId?.name?.toLowerCase() || "";

      const customerEmail =
        item?.userId?.email?.toLowerCase() || "";

      return (
        orderId.includes(searchValue) ||
        customerName.includes(searchValue) ||
        customerEmail.includes(searchValue)
      );
    })

    // Order status
    .filter((item) => {
      return selectedStatus === ""
        ? true
        : item?.status === selectedStatus;
    })

    // Payment status
    .filter((item) => {
      return selectedPaymentStatus === ""
        ? true
        : item?.paymentStatus === selectedPaymentStatus;
    });

  return {
    // Theme
    theme,
    isDark,

    // Orders
    orderData,
    filteredData,
    fetchedOrders,

    // Search
    search,
    setSearch,

    // Filters
    selectedStatus,
    setSelectedStatus,

    selectedPaymentStatus,
    setSelectedPaymentStatus,

    // Loading
    loading,

    // Manage modal
    selectedOrder,
    setSelectedOrder,

    showManageModal,
    setShowManageModal,

    // Order status
    orderStatus,
    setOrderStatus,

    // Payment status
    paymentStatus,
    setPaymentStatus,

    // Update
    updatingStatus,
    handleUpdateStatus,

    // Manage
    handleManageOrder,
  };
};