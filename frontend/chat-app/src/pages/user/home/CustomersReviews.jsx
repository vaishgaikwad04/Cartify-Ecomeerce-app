
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import { fetchAllReviews } from "../../../api/user/ReviewApi";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
} from "react-icons/fa6";

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

  // Customer Name
  const getCustomer = (review) =>
    review.userId?.name ||
    review.user?.name ||
    review.userName ||
    review.name ||
    "Customer";

  // Review Content
  const getComment = (review) =>
    review.comment ||
    review.review ||
    review.description ||
    review.reviewText ||
    "";

  // Navigate Slider
  const scrollReviews = (direction) => {
    const container = scrollRef.current;

    if (!container || reviews.length <= 1) return;

    const nextIndex =
      (activeIndex + direction + reviews.length) %
      reviews.length;

    setActiveIndex(nextIndex);

    container.scrollTo({
      left: nextIndex * container.clientWidth,
      behavior: "smooth",
    });
  };

  // Sync Index With Manual Scroll
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
      container.removeEventListener(
        "scroll",
        handleScroll
      );

      clearTimeout(timeout);
    };
  }, [reviews.length]);

  // Responsive resize handling
  useEffect(() => {
    const handleResize = () => {
      const container = scrollRef.current;

      if (!container) return;

      container.scrollTo({
        left: activeIndex * container.clientWidth,
        behavior: "instant",
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  if (loading || !reviews.length) return null;

  return (
    <section
      className={`
        w-full
        transition-colors duration-300
        ${
          isDark
            ? "bg-[#171717] text-white"
            : "bg-white text-[#292929]"
        }
      `}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-5
          sm:px-10
          lg:px-[34px]
        "
      >
        {/* Top Divider */}
        <div
          className={`
            w-full
            border-t
            ${
              isDark
                ? "border-[#383838]"
                : "border-[#e5e5e5]"
            }
          `}
        />

        {/* Review Slider */}
        <div className="relative w-full">

          {/* Previous Arrow */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Previous review"
              className={`
                absolute
                left-0
                top-1/2
                z-20
                -translate-y-1/2
                flex
                h-10
                w-10
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-[#292929] hover:text-[#999999]"
                }
              `}
            >
              <FaArrowLeftLong
                size={25}
                className="
                  transition-transform
                  duration-300
                  hover:-translate-x-1
                "
              />
            </button>
          )}

          {/* Reviews */}
          <div
            ref={scrollRef}
            className="
              flex
              w-full
              overflow-x-auto
              overflow-y-hidden
              snap-x
              snap-mandatory
              scroll-smooth
              overscroll-x-contain
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
            aria-live="polite"
          >
            {reviews.map((review, index) => (
              <article
                key={review._id || review.id || index}
                className="
                  w-full
                  min-w-full
                  shrink-0
                  snap-start
                  flex
                  flex-col
                  items-center
                  justify-center
                  min-h-[260px]
                  sm:min-h-[290px]
                  lg:min-h-[315px]
                  px-12
                  sm:px-20
                  lg:px-24
                  py-12
                  sm:py-14
                  text-center
                "
              >
                {/* Review Text */}
                <p
                  className={`
                    max-w-[1100px]
                    text-[19px]
                    sm:text-[23px]
                    md:text-[26px]
                    lg:text-[29px]
                    xl:text-[30px]
                    font-semibold
                    leading-[1.4]
                    tracking-[-0.5px]
                    transition-colors
                    duration-300
                    ${
                      isDark
                        ? "text-[#f1f1f1]"
                        : "text-[#292929]"
                    }
                  `}
                >
                  “{getComment(review)}”
                </p>

                {/* Small Divider */}
                <div
                  className={`
                    mt-9
                    mb-4
                    h-px
                    w-7
                    ${
                      isDark
                        ? "bg-[#766b60]"
                        : "bg-[#d9c7b7]"
                    }
                  `}
                />

                {/* Customer Name */}
                <p
                  className={`
                    text-[12px]
                    sm:text-[13px]
                    font-normal
                    uppercase
                    tracking-[0.02em]
                    ${
                      isDark
                        ? "text-[#d0d0d0]"
                        : "text-[#444444]"
                    }
                  `}
                >
                  {getCustomer(review)}
                </p>
              </article>
            ))}
          </div>

          {/* Next Arrow */}
          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Next review"
              className={`
                absolute
                right-0
                top-1/2
                z-20
                -translate-y-1/2
                flex
                h-10
                w-10
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-[#292929] hover:text-[#999999]"
                }
              `}
            >
              <FaArrowRightLong
                size={25}
                className="
                  transition-transform
                  duration-300
                  hover:translate-x-1
                "
              />
            </button>
          )}
        </div>

        {/* Bottom Divider */}
        <div
          className={`
            w-full
            border-b
            ${
              isDark
                ? "border-[#383838]"
                : "border-[#e5e5e5]"
            }
          `}
        />
      </div>
    </section>
  );
};

export default HomeReviews;
