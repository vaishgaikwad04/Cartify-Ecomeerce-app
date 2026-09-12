import React, { useEffect, useState, useContext } from "react";
import { deleteProduct, fetchProduct } from "../../../api/user/ProductApi";
import { ThemeContext } from "../../../context/ThemeContext";
import { fetchCategory } from "../../../api/user/CategoryApi";
import toast from "react-hot-toast";

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

const [openViewModel, setOpenViewModel] = useState(false)
const [selectedProduct, setSelectedProduct] = useState(null);
  
  //theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

 useEffect(() => {
  const fetchProductData = async () => {
    try {
      const res = await fetchProduct();

      setProductsData(res.data.fetchedProduct || []);
    } catch (error) {
      console.error("Fetch Product Error:", error);

      const message =
        error.response?.data?.message ||
        "Unable to fetch products. Please try again.";

      toast.error(message);

      setProductsData([]);
    }
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

  const handleDeleteProduct = async (id) => {
    
  try {
    const res = await deleteProduct(id);

    // Update UI only after successful deletion
    setProductsData((prev) =>
      prev.filter((item) => item._id !== id)
    );

    toast.success(
      res.data?.message || "Product deleted successfully"
    );
  } catch (error) {
    toast.error("Delete Product Error:", error);

    const message =
      error.response?.data?.message ||
      "Unable to delete product. Please try again.";

    toast.error(message);
  }
};


const handleViewProduct = (id) => {
  const product = productsData.find((item) => item._id === id);

  if (!product) {
    toast.error("Product not found");
    return;
  }

  setSelectedProduct(product);
  setOpenViewModel(true);
};

 return {
  productsData,

  search,
  setSearch,

  category,
  setCategory,

  categoryOptions,

  brand,
  setBrand,

  productStatus,
  setProductStatus,

  openCreateProductFormModal,
  setOpenCreateProductFormModal,

  selectedProductId,
  setSelectedProductId,

  isDark,

  filteredProducts,

  handleUpdateProduct,
  handleDeleteProduct,

  // View product
  handleViewProduct,
  openViewModel,
  setOpenViewModel,
  selectedProduct,
};
};
