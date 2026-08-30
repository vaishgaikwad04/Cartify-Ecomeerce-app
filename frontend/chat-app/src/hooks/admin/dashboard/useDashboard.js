import React, { useContext, useEffect, useState } from "react";

// Theme
import { ThemeContext } from "../../../context/ThemeContext";

// API
import { getAllOrders } from "../../../api/user/OrderApi";
import { fetchProduct } from "../../../api/user/ProductApi";

export const useDashboard = () => {
  // Theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // States
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const ordersRes = await getAllOrders();
      const productsRes = await fetchProduct();

      setOrderData(ordersRes.data.allOrders);
      setProductData(productsRes.data.fetchedProduct);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } 
  };

  // Run when dashboard loads
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Basic statistics
  const totalOrders = orderData.length;

  const totalProducts = productData.length;

  // Unique customers
  const customerIds = new Set(
    orderData.map((order) => order.userId?._id)
  );

  const totalCustomers = customerIds.size;

  // Order status
  const processingOrders = orderData.filter(
    (order) => order.status === "pending"
  ).length;

  const shippedOrders = orderData.filter(
    (order) => order.status === "shipped"
  ).length;

  const deliveredOrders = orderData.filter(
    (order) => order.status === "delivered"
  ).length;

  const cancelledOrders = orderData.filter(
    (order) => order.status === "cancelled"
  ).length;

  // Revenue
  const totalRevenue = orderData
    .filter((order) => order.paymentStatus === "paid")
    .reduce(
      (total, order) => total + Number(order.total || 0),
      0
    );

  // Recent orders
  const recentOrders = [...orderData]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return {
    isDark,

    totalOrders,
    totalCustomers,
    totalProducts,

    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,
    recentOrders,
  };
};
