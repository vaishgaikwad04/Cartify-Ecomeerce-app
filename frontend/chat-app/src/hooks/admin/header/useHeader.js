import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

export const useHeader = (search) => {
  const { products } = useContext(ProductContext);

  const filteredData = products.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    products,
    filteredData,
  };
};
