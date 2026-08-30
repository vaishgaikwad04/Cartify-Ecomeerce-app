import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/coupons`;

export const createCouponApi = (data) => {
  return axios.post(`${API_URL}/create`, data);
};

export const getCoupons = () => {
  return axios.get(API_URL);
};

export const getCouponById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const deleteCoupon = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateCoupon = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const applyCoupon = (data) => {
  return axios.post(`${API_URL}/apply`, data);
};