import React, { useEffect, useState, useContext } from "react";
import { deleteProduct, fetchProduct } from "../../../api/user/ProductApi";
import { ThemeContext } from "../../../context/ThemeContext";
import { fetchCategory } from "../../../api/user/CategoryApi";

export const useProduct = () => {
  //state to store products data array
  const [productsData, setProductsData] = useState([]);
  //state to store search term 
  const [search, setSearch] = useState("");
  //state to store category
  const [category, setCategory] = useState("");
  //state to store category options
  const [categoryOptions, setCategoryOptions] = useState([{ label: "All Categories", value: "" },])
   //state to store brand
  const [brand, setBrand] = useState("");
   //state to store product status
  const [productStatus, setProductStatus] = useState("");
   //state to open product form modal
  const [openCreateProductFormModal, setOpenCreateProductFormModal] = useState(false);
  //state to store selected product id
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  //theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  ///api to fetch products data 
  useEffect(() => {
    const fetchProductData = async () => {
      const res = await fetchProduct();
      setProductsData(res.data.fetchedProduct);
    };
    fetchProductData();
  }, []);

  //extract category options form category api
  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const res = await fetchCategory();
        const categoryData = res.data.fetchedCategory
        const options = [
          { label: "All Categories", value: "" },
          ...categoryData.map((item) => ({
            label: item.name,
            value: item.slug,
          })),
        ];
        setCategoryOptions(options);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryOptions();
  }, []);

  //filter products
  const filteredProducts = productsData.filter((item) => {
    const categoryMatch = !category || item.category === category;
    const brandMatch = !brand || item.brand === brand;
    const statusMatch =
      !productStatus ||
      (productStatus === "onSale" ? item.isOnSale : !item.isOnSale);

    ///search match
    const searchText = search.toLowerCase();
    const searchMatch =
      item.name?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText) ||
      item.brand?.toLowerCase().includes(searchText);

    return categoryMatch && brandMatch && statusMatch && searchMatch;
  });

  //onclick edit open edit product model form and pass selected product id
  const handleUpdateProduct = (id) => {
    setSelectedProductId(id);
    setOpenCreateProductFormModal(true);
  };

  ///call delete api
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      // optional: update UI after delete
      setProductsData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return {
  // Product data fetched from the API
  productsData,

  // Search value and function to update it
  search,
  setSearch,

  // Selected category and function to update it
  category,
  setCategory,

  // Category options used in the category dropdown
  categoryOptions,

  // Selected brand and function to update it
  brand,
  setBrand,

  // Selected product status and function to update it
  productStatus,
  setProductStatus,

  // Controls whether the create/edit product modal is open
  openCreateProductFormModal,
  setOpenCreateProductFormModal,

  // Stores the ID of the product being edited
  selectedProductId,
  setSelectedProductId,

  // Tells the component whether dark mode is active
  isDark,

  // Products after applying search and filters
  filteredProducts,

  // Opens the product form for editing
  handleUpdateProduct,

  // Deletes a product and updates the product list
  handleDeleteProduct,
};
};
