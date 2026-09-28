import { useContext, useEffect, useState } from "react";

// Context
import { categoryData } from "../../api/user/ProductApi";
import { ThemeContext } from "../../context/ThemeContext";

export const useFashionPromo = () => {
  //PRODUCT POPUP STATE
  const [openProductModel, setOpenProductModel] = useState(null);

  const [categories, setCategories] = useState([]);

  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  //function to fetch category Data
  useEffect(() => {
    const load = async () => {
      const res = await categoryData("sale");
      setCategories(res.data.data);
    };
    load();
  }, []);

  // RETURN
  return {
    openProductModel,
    setOpenProductModel,
    categories,
    isDark,
  };
};
