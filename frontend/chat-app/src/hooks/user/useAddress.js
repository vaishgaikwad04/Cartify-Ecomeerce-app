import { useEffect, useState, useCallback } from "react";

import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../api/user/AddressApi";
import { useNavigate } from "react-router-dom";


export const useAddress = () => {
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  const [editingId, setEditingId] = useState(null);

  // ==========================================
  // FETCH ADDRESSES
  // ==========================================

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getAddresses();

      setAddresses(res?.data?.addresses || []);
    } catch (error) {
      console.error(
        "Fetch address error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAddress(editingId, formData);
      } else {
        await createAddress(formData);
      }
navigate('/checkout')
      resetForm();
      await fetchAddresses();

    } catch (error) {
      console.error(
        "Address submit error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (address) => {
    setEditingId(address._id);

    setFormData({
      fullName: address.fullName || "",
      phone: address.phone || "",
      addressLine: address.addressLine || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      country: address.country || "India",
      isDefault: address.isDefault || false,
    });
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);

      await fetchAddresses();
    } catch (error) {
      console.error(
        "Delete address error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // DEFAULT ADDRESS
  // ==========================================

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);

      await fetchAddresses();
    } catch (error) {
      console.error(
        "Default address error:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isDefault: false,
    });
  };

  return {
    addresses,
    loading,
    formData,
    editingId,

    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleSetDefault,
    resetForm,

    fetchAddresses,
  };
};