import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryData } from "../../api/user/ProductApi";

export const useCategory = () => {
  // Get the category name from the URL
  const { category } = useParams();

  // Store products and category filter states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [stockFilter, setStockFilter] = useState("");

  useEffect(() => {
    // Fetch products for the selected category
    const fetchProducts = async () => {
      try {
        // Show loading state while fetching products
        setLoading(true);

        const res = await categoryData(category?.toLowerCase());

        // Store products received from the API
        setProducts(res?.data?.data || []);
      } catch (error) {
        // Log API or fetching errors
        console.log(error);
      } finally {
        // Hide loading state after the request completes
        setLoading(false);
      }
    };

    // Fetch products only when a category is available
    if (category) {
      fetchProducts();
    }
  }, [category]);

  // Filter products based on their stock availability
  const filteredData = products.filter((product) => {
    const isInStock = product?.variants?.some(
      (variant) => variant.stock > 0
    );

    if (stockFilter === "inStock") return isInStock;
    if (stockFilter === "outOfStock") return !isInStock;

    return true;
  });

  // Return data and filter controls to the component
  return {
    loading,
    showFilter,
    setShowFilter,
    stockFilter,
    setStockFilter,
    filteredData,
  };
};