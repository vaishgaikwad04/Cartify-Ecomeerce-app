import React, { createContext } from "react";
import { categoryData as fetchCategoryApi } from "../api/user/ProductApi";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {

  const fetchCategoryData = async (category) => {
    try {
      const res = await fetchCategoryApi(category?.toLowerCase());
      return res?.data?.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <CategoryContext.Provider value={{ fetchCategoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};