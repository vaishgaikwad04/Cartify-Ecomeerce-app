import React, { useState, useEffect, useContext } from "react";
import { deleteCategory, fetchCategory } from "../../../api/user/CategoryApi";
import { ThemeContext } from "../../../context/ThemeContext";

export const useCategory = () => {
  // Get current theme from ThemeContext
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Store all category data
  const [categoryData, setCategoryData] = useState([]);

  // Control create/update category modal
  const [openCreateCategoryFormModal, setOpenCreateCategoryFormModal] =
    useState(false);

  // Store selected category ID for update
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Store search input value
  const [search, setSearch] = useState("");

  // Store selected category filter
  const [selectedCategory, setSelectedCategory] = useState("");

  // Store selected status filter
  const [selectedStatus, setSelectedStatus] = useState("");

  // Fetch category data from API
  const fetchedCategory = async () => {
    try {
      const res = await fetchCategory();

      console.log(res.data.fetchedCategory);

      setCategoryData(res?.data?.fetchedCategory || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch categories when component using this hook mounts
  useEffect(() => {
    fetchedCategory();
  }, []);

  // Open update category modal
  const handleUpdateCategory = (id) => {
    setSelectedCategoryId(id);
    setOpenCreateCategoryFormModal(true);
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);

      // Refresh category data after deletion
      fetchedCategory();
    } catch (error) {
      console.log(error);
    }
  };

  // Filter category data
  const filteredData = categoryData
    // Filter by category name
    .filter((item) =>
      selectedCategory ? item.name === selectedCategory : true,
    )

    // Filter by status
    .filter((item) =>
      selectedStatus === "" ? true : String(item.status) === selectedStatus,
    )

    // Filter by search text
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  // Return everything required by the component
  return {
    theme,
    isDark,

    categoryData,
    filteredData,

    openCreateCategoryFormModal,
    setOpenCreateCategoryFormModal,

    selectedCategoryId,
    setSelectedCategoryId,

    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    selectedStatus,
    setSelectedStatus,

    fetchedCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};
