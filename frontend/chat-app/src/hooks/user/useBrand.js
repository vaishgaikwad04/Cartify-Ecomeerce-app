import { useContext, useEffect, useState } from "react";
//get products by brand name api
import { getProductsByBrandName } from "../../api/user/ProductApi";
//theme context
import { ThemeContext } from "../../context/ThemeContext";

export const useBrand = (decodedBrand) => {
  // PRODUCTS STATE
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // FETCH BRAND PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProductsByBrandName(
          decodedBrand
        );
        setProducts(res?.data?.data || []);
      } catch (error) {
        console.error(
          "Brand products error:",
          error?.response?.data || error?.message
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (decodedBrand) {
      fetchProducts();
    }
  }, [decodedBrand]);

 
  // RETURN
  return {
    products,
    loading,
    isDark,
  };
};