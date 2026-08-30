import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { fetchAllReviews} from "../../../api/user/ReviewApi";

export const useReviews = () => {
    const [reviewsData, setReviewsData] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";
 
  const fetchedReviews = async () => {
    const res = await fetchAllReviews();
    console.log(res.data.fetchedReviews);
   setReviewsData(res.data.fetchedReviews);
  };

  useEffect(() => {
    fetchedReviews()
  }, []);

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

