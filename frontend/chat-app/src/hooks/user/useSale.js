import React, { useContext, useEffect, useState } from "react";
//useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

///theme context
import { ThemeContext } from "../../context/ThemeContext";

//category api
import { categoryData } from "../../api/user/ProductApi";

export const useSale = () => {
   //navigation
  const navigate = useNavigate();

  //theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

 //state to store categories data
  const [categories, setCategories] = useState([]);

  //function to fetch category Data
  useEffect(() => {
    const load = async () => {
      const res = await categoryData("beauty");
      setCategories(res.data.data);
    };
    load();
  }, []);

  //return
  return {
    isDark,
    navigate,
    categories,
  };
};
