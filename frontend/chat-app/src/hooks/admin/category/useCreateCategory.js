import { useState, useEffect, useCallback, useContext } from "react";
import {
  createCategory,
  updateCategory,
  getCategoryById,
} from "../../../api/user/CategoryApi";
import { ThemeContext } from "../../../context/ThemeContext";

export const useCreateCategory = ({ id, onSuccess }) => {
  // Get current theme from ThemeContext
  const { theme } = useContext(ThemeContext);

  // Check whether dark mode is active
  const isDark = theme === "Dark Mode";

  // Check whether the form is being used for editing
  const isEditMode = Boolean(id);

  // Default form values
  const initialState = {
    name: "",
    slug: "",
    status: true,
    description: "",
  };

  // Store form data
  const [formData, setFormData] = useState(initialState);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // FETCH CATEGORY BY ID
  const fetchCategory = useCallback(async () => {
    // Don't fetch when creating a new category
    if (!id) return;

    try {
      const res = await getCategoryById(id);

      const data = res?.data?.data;

      // Set fetched category data into form
      setFormData({
        name: data?.name || "",
        slug: data?.slug || "",
        status: data?.status ?? true,
        description: data?.description || "",
      });
    } catch (error) {
      console.error(
        "Fetch category error:",
        error.response?.data || error.message,
      );
    }
  }, [id]);

  // FETCH CATEGORY WHEN EDITING
  // RESET FORM WHEN CREATING
  useEffect(() => {
    if (id) {
      fetchCategory();
    } else {
      setFormData(initialState);
    }
  }, [id, fetchCategory]);

  // RESET FORM
  const resetForm = () => {
    setFormData(initialState);
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Update existing category
        await updateCategory(id, formData);
      } else {
        // Create new category
        await createCategory(formData);

        // Reset form after successful creation
        resetForm();
      }

      // Notify parent component
      // Parent can refresh table and close modal
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(
        "Category submit error:",
        error.response?.data || error.message,
      );
    }
  };

  const handleUpdateCategory = (id) => {
    setSelectedCategoryId(id);
    setOpenCreateCategoryFormModal(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchedCategory();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isDark,
    formData,
    handleChange,
    handleSubmit,
    handleUpdateCategory,
    handleDeleteCategory,
    isEditMode,
    resetForm,
  };
};
