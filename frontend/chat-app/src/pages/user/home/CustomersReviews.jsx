
import React, { useEffect, useRef, useState, useContext } from "react";
import { fetchAllReviews } from "../../../api/user/ReviewApi";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";



const HomeReviews = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);

  // Fetch Reviews
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

  // Customer Details
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

  // Navigate Reviews
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

  // Sync Active Index with Swipe
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

  const dividerColor = isDark
    ? "bg-[#48413a]"
    : "bg-[#ded3c6]";

  const arrowColor = isDark
    ? "text-gray-400 hover:text-[#c2a88b]"
    : "text-[#777777] hover:text-[#a18a70]";

  return (
    <section
      className="
        w-full
        py-8 sm:py-10 lg:py-12
        transition-colors duration-300
      "
    >
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-8">

        {/* Review Slider */}
        <div className="relative mx-auto max-w-[1700px]">

          {/* Previous Arrow */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Previous review"
              className={`
                absolute left-0 sm:-left-2 lg:-left-5
                top-1/2 z-20
                flex h-9 w-9 sm:h-10 sm:w-10
                -translate-y-1/2
                items-center justify-center
                transition-all duration-300
                ${arrowColor}
              `}
            >
              <FaArrowLeftLong 
                size={27}
                strokeWidth={1.3}
                className="transition-transform duration-300 hover:-translate-x-1"
              />
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
                    px-10 py-2
                    sm:px-14 sm:py-3
                  "
                >
                  <div
                    className={`
                      flex min-h-[180px]
                      sm:min-h-[190px]
                      lg:min-h-[200px]
                      flex-col items-center justify-center
                      rounded-xl
                      px-4 py-6
                      sm:px-10 sm:py-7
                      text-center
                      transition-colors duration-300
                    
                    `}
                  >
                    {/* Review Text */}
                    <p
                      className={`
                        max-w-[670px]
                        text-sm sm:text-md lg:text-lg
                        font-medium
                        font-semibold
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

          {/* Next Arrow */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Next review"
              className={`
                absolute right-0 sm:-right-2 lg:-right-5
                top-1/2 z-20
                flex h-9 w-9 sm:h-10 sm:w-10
                -translate-y-1/2
                items-center justify-center
                transition-all duration-300
                ${arrowColor}
              `}
            >
              <FaArrowRightLong 
                size={27}
                strokeWidth={1.3}
                className="transition-transform duration-300 hover:translate-x-1"
              />
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default HomeReviews;
