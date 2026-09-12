import React, { useEffect, useState, useContext } from "react";
import { getAllOrders } from "../../../api/user/OrderApi";
import { ThemeContext } from "../../../context/ThemeContext";
import toast from "react-hot-toast";

export const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [viewCustomerModel, setViewCustomerModel] = useState(false);

  //THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  //GET ALL ORDERS
  const fetchCustomers = async () => {
    try {
      const res = await getAllOrders();
      const orders = res.data.allOrders || [];

      // CREATE UNIQUE CUSTOMERS
      const customerMap = new Map();
      orders.forEach((order) => {
        const customer = order?.userId;
        if (!customer?._id) return;

        // CREATE CUSTOMER
        if (!customerMap.has(customer._id)) {
          customerMap.set(customer._id, {
            // Customer basic information
            _id: customer._id,
            name: customer.name || "Unknown Customer",
            email: customer.email || "No Email",

            // Customer contact information
            phone: order?.shippingAddress?.phone || "No Phone",

            // Address
            address: {
              fullName: order?.shippingAddress?.fullName || customer.name || "",
              phone: order?.shippingAddress?.phone || "",
              addressLine: order?.shippingAddress?.addressLine || "",
              city: order?.shippingAddress?.city || "",
              state: order?.shippingAddress?.state || "",
              postalCode: order?.shippingAddress?.postalCode || "",
              country: order?.shippingAddress?.country || "",
            },

            // Order information
            totalOrders: 0,
            totalSpent: 0,

            // Complete orders
            orders: [],

            // Latest order
            lastOrderDate: null,
            lastOrderStatus: null,
            lastPaymentStatus: null,
          });
        }
        const customerData = customerMap.get(customer._id);

        // ORDER COUNT
        customerData.totalOrders += 1;

        // TOTAL SPENT
        customerData.totalSpent += Number(order?.total || 0);

        // KEEP COMPLETE ORDER
        customerData.orders.push(order);

        // CHECK LATEST ORDER
        if (order?.createdAt) {
          const currentOrderDate = new Date(order.createdAt);
          const previousOrderDate = customerData.lastOrderDate
            ? new Date(customerData.lastOrderDate)
            : null;
          if (!previousOrderDate || currentOrderDate > previousOrderDate) {
            // Use latest order's address
            customerData.address = {
              fullName: order?.shippingAddress?.fullName || customer.name || "",
              phone: order?.shippingAddress?.phone || "",
              addressLine: order?.shippingAddress?.addressLine || "",
              city: order?.shippingAddress?.city || "",
              state: order?.shippingAddress?.state || "",
              postalCode: order?.shippingAddress?.postalCode || "",
              country: order?.shippingAddress?.country || "",
            };

            customerData.phone =
              order?.shippingAddress?.phone || customerData.phone;
            customerData.lastOrderDate = order.createdAt;
            customerData.lastOrderStatus = order.status;
            customerData.lastPaymentStatus = order.paymentStatus;
          }
        }
      });

      // CONVERT MAP → ARRAY
      const customerList = Array.from(customerMap.values());
      setCustomers(customerList);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleUpdateCustomer = (id) => {
    const customer = customers.find((item) => item._id === id);
    if (!customer) {
      toast.error("Customer not found");
      return;
    }

    setSelectedCustomer(customer);
    setShowUpdateModal(true);
  };

  const filteredData = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    const matchSearch =
      customer?.name?.toLowerCase().includes(searchValue) ||
      customer?.email?.toLowerCase().includes(searchValue) ||
      customer?.phone?.toLowerCase().includes(searchValue) ||
      customer?.address?.city?.toLowerCase().includes(searchValue) ||
      customer?.address?.country?.toLowerCase().includes(searchValue);

    const matchStatus = status ? customer?.lastOrderStatus === status : true;

    return matchSearch && matchStatus;
  });

  // STATS
  const totalCustomers = customers.length;
  const totalOrders = customers.reduce(
    (total, customer) => total + Number(customer?.totalOrders || 0),
    0,
  );

  const totalRevenue = customers.reduce(
    (total, customer) => total + Number(customer?.totalSpent || 0),
    0,
  );

  const deliveredCustomers = customers.filter(
    (customer) => customer?.lastOrderStatus === "delivered",
  ).length;

  const handleViewCustomer = (id) => {
    const customer = customers.find((customer) => customer._id === id);
    setSelectedCustomer(customer);
    setViewCustomerModel(true);
  };

  return {
    // Customer data
    customers,
    filteredData,

    // Search
    search,
    setSearch,

    // Status filter
    status,
    setStatus,

    // Theme
    isDark,

    // Update customer
    selectedCustomer,
    showUpdateModal,
    setShowUpdateModal,
    handleUpdateCustomer,

    // Refresh
    fetchCustomers,

    // Statistics
    totalCustomers,
    totalOrders,
    totalRevenue,
    deliveredCustomers,
    handleViewCustomer,
    viewCustomerModel,
     setViewCustomerModel
  };
};
