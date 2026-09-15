import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { fetchAllReviews} from "../../../api/user/ReviewApi";

export const useReviews = () => {
  //STATE
  const [reviewsData, setReviewsData] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  //THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";
 
  //FETCH REVIEW FUNCTION
  const fetchedReviews = async () => {
    const res = await fetchAllReviews();
   setReviewsData(res.data.fetchedReviews);
  };

  useEffect(() => {
    fetchedReviews()
  }, []);

  //FILTER REVIEWS
  const filteredReviews = reviewsData.filter((review) => {
    const matchesSearch =
      review.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      review.comment?.toLowerCase().includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === "" || review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });
  

  return {
  // Reviews data
  reviewsData,
  filteredReviews,

  // Search
  search,
  setSearch,

  // Rating filter
  ratingFilter,
  setRatingFilter,

  // Theme
  isDark,

  // Refresh reviews
  fetchedReviews,
};
}

