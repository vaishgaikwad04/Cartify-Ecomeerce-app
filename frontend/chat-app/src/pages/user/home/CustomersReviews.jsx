
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import { fetchAllReviews } from "../../../api/user/ReviewApi";
import { ThemeContext } from "../../../context/ThemeContext";

import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const HomeReviews = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);

  // Fetch reviews
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

  // Customer details
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

  // Navigate between reviews
  const scrollReviews = (direction) => {
    if (!reviews.length || !scrollRef.current) return;

    const nextIndex =
      (activeIndex + direction + reviews.length) %
      reviews.length;

    setActiveIndex(nextIndex);

    scrollRef.current.scrollTo({
      left: nextIndex * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  // Sync active index with swipe / scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const width = container.clientWidth;
        if (!width) return;

        const index = Math.round(
          container.scrollLeft / width
        );

        setActiveIndex(
          Math.min(index, reviews.length - 1)
        );
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

  // Theme styles
  const sectionBg = isDark
    ? "bg-[#111111]"
    : "bg-[#faf9f7]";

  const cardBg = isDark
    ? "bg-[#1b1b1b]"
    : "bg-white";



  const headingText = isDark
    ? "text-gray-100"
    : "text-[#292929]";

  const customerText = isDark
    ? "text-gray-300"
    : "text-[#333333]";

  const mutedText = isDark
    ? "text-gray-500"
    : "text-[#777777]";

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
        ${sectionBg}
        py-16 sm:py-20 lg:py-24
        transition-colors duration-300
      `}
    >
      <div className="mx-auto w-full max-w-[1250px] px-5 sm:px-10">

        {/* Review slider */}
        <div className="relative mx-auto max-w-[950px]">

          {/* Previous button */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Previous review"
              className={`
                absolute left-0 top-1/2 z-20
                hidden h-11 w-11
                -translate-x-1/2 -translate-y-1/2
                items-center justify-center
                rounded-full border
                shadow-sm
                transition-all duration-300
                sm:flex
                ${buttonStyle}
              `}
            >
              <FiChevronLeft size={21} />
            </button>
          )}

          {/* Reviews scroller */}
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
                    w-full shrink-0 snap-start
                    px-3 py-3
                    sm:px-12 sm:py-5
                  "
                >
                  <div
                    className={`
                      flex min-h-[310px] flex-col
                      items-center justify-center
                      rounded-xl 
                      px-6 py-10
                      text-center
                      transition-colors duration-300
                      sm:min-h-[340px]
                      sm:px-12 sm:py-12
                      ${cardBg}
                      
                      ${
                        isDark
                          ? "shadow-[0_8px_35px_rgba(0,0,0,0.15)]"
                          : "shadow-[0_8px_35px_rgba(0,0,0,0.025)]"
                      }
                    `}
                  >
                    {/* Review description */}
                    <p
                      className={`
                        text-xl font-medium
                        tracking-tight leading-relaxed
                        sm:text-2xl lg:text-3xl
                        transition-colors duration-300
                        ${headingText}
                      `}
                    >
                      {getComment(review)}
                    </p>

                    {/* Divider */}
                    <div
                      className={`
                        my-7 h-px w-10
                        ${dividerColor}
                      `}
                    />

                    {/* Customer profile */}
                    <div className="flex items-center justify-center">
                      <p
                        className={`
                          text-xs font-semibold
                          uppercase tracking-[0.12em]
                          transition-colors duration-300
                          ${customerText}
                        `}
                      >
                        {customer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Next button */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Next review"
              className={`
                absolute right-0 top-1/2 z-20
                hidden h-11 w-11
                translate-x-1/2 -translate-y-1/2
                items-center justify-center
                rounded-full border
                shadow-sm
                transition-all duration-300
                sm:flex
                ${buttonStyle}
              `}
            >
              <FiChevronRight size={21} />
            </button>
          )}
        </div>

        {/* Mobile navigation */}
        {reviews.length > 1 && (
          <div className="mt-7 flex items-center justify-center gap-5 sm:hidden">
            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Previous review"
              className={`
                flex h-9 w-9
                items-center justify-center
                rounded-full border
                transition-all duration-300
                ${buttonStyle}
              `}
            >
              <FiChevronLeft size={19} />
            </button>

            <span
              className={`
                text-xs tracking-widest
                ${mutedText}
              `}
            >
              {String(activeIndex + 1).padStart(2, "0")}

              <span
                className={`
                  mx-2
                  ${isDark ? "text-gray-600" : "text-[#c5b9ac]"}
                `}
              >
                /
              </span>

              {String(reviews.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Next review"
              className={`
                flex h-9 w-9
                items-center justify-center
                rounded-full border
                transition-all duration-300
                ${buttonStyle}
              `}
            >
              <FiChevronRight size={19} />
            </button>
          </div>
        )}

        {/* Desktop pagination */}
        {reviews.length > 1 && (
          <div className="mt-8 hidden items-center justify-center gap-2 sm:flex">
            {reviews.map((review, index) => (
              <button
                key={review._id || review.id || index}
                type="button"
                onClick={() => {
                  setActiveIndex(index);

                  scrollRef.current?.scrollTo({
                    left:
                      index * scrollRef.current.clientWidth,
                    behavior: "smooth",
                  });
                }}
                aria-label={`Go to review ${index + 1}`}
                className={`
                  h-1 rounded-full
                  transition-all duration-300
                  ${
                    activeIndex === index
                      ? "w-8 bg-[#a18a70]"
                      : isDark
                        ? "w-3 bg-[#454545] hover:bg-[#a18a70]"
                        : "w-3 bg-[#d9d2ca] hover:bg-[#a18a70]"
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
