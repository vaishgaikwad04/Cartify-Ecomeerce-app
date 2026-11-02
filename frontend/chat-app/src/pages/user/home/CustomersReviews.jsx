

import React, { useEffect, useRef, useState, useContext } from "react";
import { fetchAllReviews } from "../../../api/user/ReviewApi";
import { ThemeContext } from "../../../context/ThemeContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HomeReviews = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetchAllReviews();
        const data = response?.data?.fetchedReviews;

        const reviewList = Array.isArray(data)
          ? data
          : Array.isArray(data?.reviews)
            ? data.reviews
            : Array.isArray(data?.data)
              ? data.data
              : [];

        setReviews(reviewList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  const getCustomer = (review) =>
    review.userId?.name ||
    review.user?.name ||
    review.userName ||
    review.name ||
    "Customer";

  const getComment = (review) =>
    review.comment ||
    review.review ||
    review.description ||
    review.reviewText ||
    "";

  const scrollReviews = (direction) => {
    if (!reviews.length || !scrollRef.current) return;

    const nextIndex =
      (activeIndex + direction + reviews.length) % reviews.length;

    setActiveIndex(nextIndex);

    scrollRef.current.scrollTo({
      left: nextIndex * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const width = container.clientWidth;
        if (!width) return;

        const index = Math.round(container.scrollLeft / width);
        setActiveIndex(Math.min(index, reviews.length - 1));
      }, 100);
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [reviews.length]);

  if (loading || !reviews.length) return null;

  const headingText = isDark
    ? "text-gray-100"
    : "text-[#292929]";

  const customerText = isDark
    ? "text-gray-300"
    : "text-[#444444]";

  const mutedText = isDark
    ? "text-gray-500"
    : "text-[#888888]";

  const dividerColor = isDark
    ? "bg-[#48413a]"
    : "bg-[#ded3c6]";

  const buttonStyle = isDark
    ? "border-[#383838] bg-[#222222] text-gray-300 hover:border-[#a18a70] hover:bg-[#a18a70] hover:text-white"
    : "border-[#e7e2dc] bg-white text-[#555555] hover:border-[#a18a70] hover:bg-[#a18a70] hover:text-white";

  return (
    <section
      className={`
        w-full
        py-8 sm:py-10 lg:py-12
        transition-colors duration-300
      `}
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-8">

        {/* Review Slider */}
        <div className="relative mx-auto max-w-[820px]">

          {/* Previous Button */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Previous review"
              className={`
                absolute left-0 top-1/2 z-20
                hidden sm:flex
                h-8 w-8 lg:h-9 lg:w-9
                -translate-x-1/2 -translate-y-1/2
                items-center justify-center
                rounded-full border
                transition-all duration-300
                ${buttonStyle}
              `}
            >
              <FiChevronLeft size={18} />
            </button>
          )}

          {/* Reviews Scroller */}
          <div
            ref={scrollRef}
            className={`
              review-scrollbar
              ${isDark ? "review-scrollbar-dark" : "review-scrollbar-light"}
              flex w-full flex-nowrap
              overflow-x-auto overflow-y-hidden
              snap-x snap-mandatory
              scroll-smooth
              overscroll-x-contain
            `}
          >
            {reviews.map((review, index) => {
              const customer = getCustomer(review);

              return (
                <article
                  key={review._id || review.id || index}
                  className="
                    w-full min-w-0 shrink-0 snap-start
                    px-2 py-2
                    sm:px-10 sm:py-3
                  "
                >
                  <div
                    className={`
                      flex min-h-[180px] sm:min-h-[190px] lg:min-h-[200px]
                      flex-col items-center justify-center
                      rounded-xl
                      px-5 py-6
                      sm:px-10 sm:py-7
                      text-center
                      transition-colors duration-300
                     
                    `}
                  >
                    {/* Review Text */}
                    <p
                      className={`
                        max-w-[650px]
                        text-sm sm:text-base lg:text-lg
                        font-medium
                        leading-relaxed
                        tracking-normal
                        break-words
                        transition-colors duration-300
                        ${headingText}
                      `}
                    >
                      {getComment(review)}
                    </p>

                    {/* Divider */}
                    <div
                      className={`
                        my-4 h-px w-8
                        ${dividerColor}
                      `}
                    />

                    {/* Customer Name */}
                    <p
                      className={`
                        text-[10px] sm:text-xs
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        ${customerText}
                      `}
                    >
                      {customer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Next Button */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Next review"
              className={`
                absolute right-0 top-1/2 z-20
                hidden sm:flex
                h-8 w-8 lg:h-9 lg:w-9
                translate-x-1/2 -translate-y-1/2
                items-center justify-center
                rounded-full border
                shadow-sm
                transition-all duration-300
                ${buttonStyle}
              `}
            >
              <FiChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {reviews.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4 sm:hidden">

            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Previous review"
              className={`
                flex h-8 w-8 items-center justify-center
                rounded-full border
                transition-all duration-300
                ${buttonStyle}
              `}
            >
              <FiChevronLeft size={17} />
            </button>

            <span
              className={`text-[11px] tracking-widest ${mutedText}`}
            >
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-2">/</span>
              {String(reviews.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Next review"
              className={`
                flex h-8 w-8 items-center justify-center
                rounded-full border
                transition-all duration-300
                ${buttonStyle}
              `}
            >
              <FiChevronRight size={17} />
            </button>
          </div>
        )}

        {/* Desktop Pagination */}
        {reviews.length > 1 && (
          <div className="mt-5 hidden items-center justify-center gap-2 sm:flex">
            {reviews.map((review, index) => (
              <button
                key={review._id || review.id || index}
                type="button"
                onClick={() => {
                  setActiveIndex(index);

                  scrollRef.current?.scrollTo({
                    left: index * scrollRef.current.clientWidth,
                    behavior: "smooth",
                  });
                }}
                aria-label={`Go to review ${index + 1}`}
                className={`
                  h-1 rounded-full
                  transition-all duration-300
                  ${
                    activeIndex === index
                      ? "w-7 bg-[#a18a70]"
                      : isDark
                        ? "w-2.5 bg-[#454545] hover:bg-[#a18a70]"
                        : "w-2.5 bg-[#d9d2ca] hover:bg-[#a18a70]"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeReviews;
