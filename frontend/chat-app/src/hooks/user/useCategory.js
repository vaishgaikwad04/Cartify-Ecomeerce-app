import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";

import { categoryData } from "../../api/user/CategoryApi";
import { ThemeContext } from "../../context/ThemeContext";

export const useCategory = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";
  const { category } = useParams();

  // =========================
  // PRODUCTS
  // =========================
  const [products, setProducts] = useState([]);

  // =========================
  // LOADING
  // =========================
  const [loading, setLoading] = useState(false);

  // =========================
  // FILTER
  // =========================
  const [showFilter, setShowFilter] = useState(false);
  const [stockFilter, setStockFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  // =========================
  // PAGINATION
  // =========================

  // Current page
  const [currentPage, setCurrentPage] = useState(1);

  // Total pages coming from backend
  const [totalPages, setTotalPages] = useState(1);

  // Products shown on one page
  const limit = 5;

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await categoryData(
          category?.toLowerCase(),
          currentPage,
          limit
        );

        // Products for current page
        setProducts(res?.data?.data || []);

        // Total pages from backend
        setTotalPages(
          Number(res?.data?.totalPages) || 1
        );
      } catch (error) {
        console.log("Category products error:", error);

        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, currentPage]);

  // =========================
  // RESET PAGE WHEN CATEGORY CHANGES
  // =========================
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // =========================
  // STOCK FILTER
  // =========================
  const filteredData = products.filter((product) => {
  // STOCK FILTER
  const isInStock = product?.variants?.some(
    (variant) => variant.stock > 0
  );

  if (stockFilter === "inStock" && !isInStock) {
    return false;
  }

  if (stockFilter === "outOfStock" && isInStock) {
    return false;
  }

  // PRICE
  const price = Number(product?.price || 0);

  if (priceFilter === "under1000" && price >= 1000) {
    return false;
  }

  if (priceFilter === "1000to2000" && (price < 1000 || price > 2000)) {
    return false;
  }

  if (priceFilter === "2000to5000" && (price < 2000 || price > 5000)) {
    return false;
  }

  if (priceFilter === "above5000" && price <= 5000) {
    return false;
  }

  return true;
});

  // =========================
  // RETURN
  // =========================
  return {
    loading,
    isDark,
    // Filter
    showFilter,
    setShowFilter,
    stockFilter,
    setStockFilter,
    priceFilter,
    setPriceFilter,

    // Products
    filteredData,

    // Pagination
    currentPage,
    totalPages,
    setCurrentPage,
  };
};