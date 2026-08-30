import { useContext, useEffect, useState } from "react";

// Context
import { ProductContext } from "../../context/ProductContext";
import { ThemeContext } from "../../context/ThemeContext";

export const useFashionPromo = () => {

  //PRODUCT POPUP STATE
  const [openProductModel, setOpenProductModel] = useState(null);

  //products
  const { products, fetchProducts } =
    useContext(ProductContext);

  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // RETURN
  return {
    openProductModel,
    setOpenProductModel,
    products,
    isDark,
  };
};