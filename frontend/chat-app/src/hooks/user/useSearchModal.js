import { useState, useCallback } from "react";
import { searchProducts } from "../../../api/user/ProductApi";

export const useHeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = useCallback(async (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await searchProducts(value);
      setResults(res?.data?.data || []);
    } catch (err) {
      console.log("Search Error:", err);
    }
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  return {
    searchTerm,
    results,
    handleSearch,
    clearSearch,
  };
};