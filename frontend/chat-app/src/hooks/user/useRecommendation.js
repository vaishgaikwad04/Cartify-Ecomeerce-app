import React, { useEffect, useState, useContext } from "react";
import { categoryData } from "../../api/user/ProductApi";
import { ThemeContext } from "../../context/ThemeContext";

export const useRecommendation = ({ currentId, category }) => {
  // Store the recommended products
  const [products, setProducts] = useState([]);

  // Get the current theme
  const { theme } = useContext(ThemeContext);

  // Check if dark mode is enabled
  const isDark = theme === "Dark Mode";

  useEffect(() => {
    // Fetch products from the current category
    const getProducts = async () => {
      try {
        // Stop if category or product ID is missing
        if (!category || !currentId) return;

        const res = await categoryData(category);

        // Get the products from the API response
        const productsArray = res?.data?.data || [];

        // Remove the current product and limit recommendations to 5
        const filtered = productsArray

          .filter((item) => item._id !== currentId)

          .slice(0, 5);

        // Store the filtered products
        setProducts(filtered);
      } catch (err) {
        // Log API or fetching errors
        console.log(err);
      }
    };

    getProducts();
  }, [category, currentId]);

  // Return products and theme information
  return {
    products,
    isDark,
  };
};