import React, { useState, useEffect, useContext } from "react";
import { deleteCategory, fetchCategory } from "../../../api/user/CategoryApi";
import { ThemeContext } from "../../../context/ThemeContext";
import toast from "react-hot-toast";

export const useCategory = () => {
  // Theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Category data
  const [categoryData, setCategoryData] = useState([]);

  // Create / Edit modal
  const [openCreateCategoryFormModal, setOpenCreateCategoryFormModal] =
    useState(false);

  // Selected category ID for Edit
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Selected category object for View
  const [viewCategory, setViewCategory] = useState(null);

  // View modal
  const [openViewModel, setOpenViewModel] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState("");

  // Status filter
  const [selectedStatus, setSelectedStatus] = useState("");

  // Fetch categories
  const fetchedCategory = async () => {
    try {
      const res = await fetchCategory();

      setCategoryData(res?.data?.fetchedCategory || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch Category");
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchedCategory();
  }, []);

  // Edit category
  const handleUpdateCategory = (id) => {
    setSelectedCategoryId(id);
    setOpenCreateCategoryFormModal(true);
  };

  // View category
  const handleViewCategory = (id) => {
    const category = categoryData.find((item) => item._id === id);

    if (!category) {
      toast.error("Category not found");
      return;
    }

    setViewCategory(category);
    setOpenViewModel(true);
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);

      fetchedCategory();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete Category",
      );
    }
  };

  // Filter category data
  const filteredData = categoryData
    // Category filter
    .filter((item) =>
      selectedCategory ? item.name === selectedCategory : true,
    )

    // Status filter
    .filter((item) =>
      selectedStatus === "" ? true : String(item.status) === selectedStatus,
    )

    // Search
    .filter((item) => item.name?.toLowerCase().includes(search.toLowerCase()));

  return {
    theme,
    isDark,

    // Data
    categoryData,
    filteredData,

    // Create / Edit modal
    openCreateCategoryFormModal,
    setOpenCreateCategoryFormModal,

    // Edit category
    selectedCategoryId,
    setSelectedCategoryId,

    // View category
    viewCategory,
    setViewCategory,
    openViewModel,
    setOpenViewModel,

    // Search
    search,
    setSearch,

    // Filters
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,

    // API
    fetchedCategory,

    // Actions
    handleUpdateCategory,
    handleDeleteCategory,
    handleViewCategory,
  };
};
