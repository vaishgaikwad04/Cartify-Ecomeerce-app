import { useContext, useEffect, useState } from "react";

// Context
import { CategoryContext } from "../../context/CategoryContext";
import { ThemeContext } from "../../context/ThemeContext";

export const useNewArrivals = () => {
  // CATEGORIES STATE
  const [categories, setCategories] = useState([]);

  // CATEGORY CONTEXT
  const { fetchCategoryData } = useContext(CategoryContext);

  //theme context
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // FETCH NEW ARRIVALS
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryData("new-in-body");

        setCategories(data || []);
        console.log("NEW ARRIVALS DATA:", data);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);

        setCategories([]);
      }
    };

    loadCategories();
  }, [fetchCategoryData]);

  


  // RETURN
  return {
    categories,
    isDark,
  };
};
