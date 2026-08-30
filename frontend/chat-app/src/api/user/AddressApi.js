import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/address`;

// Create address
export const createAddress = (data) => {
  return axios.post(API, data, {
    withCredentials: true,
  });
};

// Get all addresses
export const getAddresses = () => {
  return axios.get(API, {
    withCredentials: true,
  });
};

// Get single address
export const getAddressById = (id) => {
  return axios.get(`${API}/${id}`, {
    withCredentials: true,
  });
};

// Update address
export const updateAddress = (id, data) => {
  return axios.put(`${API}/${id}`, data, {
    withCredentials: true,
  });
};

// Delete address
export const deleteAddress = (id) => {
  return axios.delete(`${API}/${id}`, {
    withCredentials: true,
  });
};

// Set default address
export const setDefaultAddress = (id) => {
  return axios.patch(
    `${API}/${id}/default`,
    {},
    {
      withCredentials: true,
    }
  );
};