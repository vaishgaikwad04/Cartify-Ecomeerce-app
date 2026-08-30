import React, { useState, useEffect, useContext } from "react";

// Product APIs for creating, fetching and updating products
import {
  createProduct,
  fetchSingleProduct,
  updateProduct,
} from "../../../api/user/ProductApi";

// API for fetching categories
import { fetchCategory } from "../../../api/user/CategoryApi";

// Theme context
import { ThemeContext } from "../../../context/ThemeContext";

// Default values for the product form
const initialState = {
  name: "",
  price: "",
  category: "",
  brand: "",
  discountPrice: "",
  description: "",
  details: "",
  careFit: "",
  isOnSale: false,
  variants: [],
};

// Receive productId from the product page
export const useCreateProduct = ({ productId }) => {

  // Check whether the form is in edit mode
  const isEdit = Boolean(productId);

  // Get the current theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Store the category data
  const [category, setCategory] = useState([]);

  // Store selected image files
  const [files, setFiles] = useState([]);

  // Store the product form data
  const [formData, setFormData] = useState(initialState);

  // Reset the form to its initial state
  const resetForm = () => {
    setFormData(initialState);
    setFiles([]);
  };

  // Fetch the selected product for editing
  const fetchProductById = async () => {
    try {
      const res = await fetchSingleProduct(productId);
      const product = res.data.product;

      // Fill the form with the fetched product data
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        brand: product.brand || "",
        discountPrice: product.discountPrice || "",
        description: product.description || "",
        details: product.details || "",
        careFit: product.careFit || "",
        isOnSale: product.isOnSale || false,
        variants: product.variants || [],
      });

    } catch (error) {
      console.log("Fetch single product error:", error);
    }
  };

  // Fetch the product when productId changes
  useEffect(() => {
    // Only fetch when editing a product
    if (productId) {
      fetchProductById();
    } else {
      // Reset the form when creating a new product
      resetForm();
    }
  }, [productId]);

  // Handle changes in normal form fields
  const handleFormData = (e) => {
    const { name, value } = e.target;dseeeeeeeee
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add or remove a product size
// Get the selected size and its checked status from the checkbox
  const handleSizeChange = (size, checked) => {
    setFormData((prev) => {
      let updated;

      if (checked) {
        // Add the selected size with initial stock
        updated = [...prev.variants, { size, stock: 0 }];
      } else {
        // Remove the unselected size
        updated = prev.variants.filter((item) => item.size !== size);
      }

      return {
        ...prev,
        variants: updated,
      };
    });
  };

  // Update stock for a selected size
  const handleStockChange = (size, value) => {
    setFormData((prev) => {
      const updated = prev.variants.map((item) =>
        item.size === size
          ? { ...item, stock: value }
          : item
      );

      return {
        ...prev,
        variants: updated,
      };
    });
  };

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const res = await fetchCategory();

      // Store the fetched categories
      setCategory(res.data.fetchedCategory);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Convert category data into dropdown options
  const categoryOptions = category.map((cat) => ({
    label: cat.name,
    value: cat.slug,
  }));

  // Handle product creation and updating
  const handleSubmit = async (e) => {

    // Prevent the page from refreshing
    e.preventDefault();

    try {

      // Create FormData to send product data and images
      const data = new FormData();

      // Add product fields to FormData
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("discountPrice", formData.discountPrice);
      data.append("description", formData.description);
      data.append("details", formData.details);
      data.append("careFit", formData.careFit);

      // Convert boolean to string before adding to FormData
      data.append("isOnSale", JSON.stringify(formData.isOnSale));

      // Convert variants array to string before adding to FormData
      data.append("variants", JSON.stringify(formData.variants));

      // Add selected images to FormData
      files.forEach((file) => {
        data.append("images", file);
      });

      // Update the product when productId exists
      if (productId) {

        await updateProduct(productId, data);

        alert("Product updated successfully");

        // Refresh the form with updated product data
        fetchProductById();

      }

      // Create a new product when productId does not exist
      else {

        await createProduct(data);

        alert("Product created successfully");

        // Clear the form after creating the product
        resetForm();
      }

    } catch (error) {

      // Log any error that occurs during submission
      console.log(error);
    }
  };

  return {

    // Dark mode status
    isDark,

    // Product form submit function
    handleSubmit,

    // Stock change function
    handleStockChange,

    // Size change function
    handleSizeChange,

    // Normal input change function
    handleFormData,

    // Current form data
    formData,

    // Function to update form data
    setFormData,

    // Whether the form is in edit mode
    isEdit,

    // Function to store selected images
    setFiles,

    // Options for the category dropdown
    categoryOptions,
  };
};