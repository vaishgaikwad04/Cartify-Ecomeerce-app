import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/orders`;

export const createCheckoutSession = (products, selectedAddressId) => {
  return axios.post(
    `${API}/create-checkout-session`,
    {
      products,
      addressId: selectedAddressId,
    },
    {
      withCredentials: true,
    }
  );
};

export const getOrdersByUserId = () =>
  axios.get(`${API}/all`, {
    withCredentials: true,
  });

export const getAllOrders = () =>
  axios.get(`${API}`, {
    withCredentials: true,
  });

export const updateOrderStatus = (
  orderId,
  status,
  paymentStatus
) => {
  return axios.patch(
    `${API}/${orderId}/status`,
    {
      status,
      paymentStatus,
    },
    {
      withCredentials: true,
    }
  );
};

export const updateCustomer = (id, data) => {
  return axios.patch(
    `${API}/customer/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
};