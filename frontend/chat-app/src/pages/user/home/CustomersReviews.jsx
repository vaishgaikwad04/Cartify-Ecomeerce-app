
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

  // THEME

  const sectionBg = isDark
    ? "bg-[#171715]"
    : "bg-[#F7F5F0]";

  const primaryText = isDark
    ? "text-[#F1EEE8]"
    : "text-[#292722]";

  const borderColor = isDark
    ? "border-white/10"
    : "border-[#E5E0D7]";

  const arrowStyle = isDark
    ? "text-[#B5AEA2] hover:text-white hover:bg-white/[0.06]"
    : "text-[#57534C] hover:text-black hover:bg-black/[0.04]";

  const slideBg = isDark
    ? "bg-[#171715]"
    : "bg-[#F7F5F0]";

  // FETCH REVIEWS

  useEffect(() => {
    let isMounted = true;

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

        if (isMounted) {
          setReviews(reviewList);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);

        if (isMounted) {
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  // CUSTOMER DETAILS

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

  // SLIDER NAVIGATION

  const scrollToReview = (index) => {
    const container = scrollRef.current;

    if (!container || !reviews.length) return;

    const nextIndex =
      (index + reviews.length) % reviews.length;

    setActiveIndex(nextIndex);

    container.scrollTo({
      left: nextIndex * container.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollReviews = (direction) => {
    scrollToReview(activeIndex + direction);
  };

  // SYNC INDEX WITH MANUAL SCROLL

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
          Math.min(
            Math.max(index, 0),
            reviews.length - 1
          )
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

  // RESPONSIVE RESIZE

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleResize = () => {
      container.scrollTo({
        left: activeIndex * container.clientWidth,
        behavior: "auto",
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  // LOADING / EMPTY STATE

  if (loading || !reviews.length) return null;

  // RENDER

  return (
    <section
      className={`
        relative
        w-full
        overflow-hidden
        transition-colors
        duration-300
        ${sectionBg}
      `}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          sm:px-8
          lg:px-10
          xl:px-14
          py-7
          sm:py-9
          lg:py-16
        "
      >
        {/* TOP DIVIDER */}

        <div
          className={`
            w-full
            border-t
            ${borderColor}
          `}
        />

        {/* REVIEW SLIDER */}

        <div className="relative mt-3 sm:mt-5 lg:mt-8">

          {/* PREVIOUS ARROW */}

          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Previous review"
              className={`
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                z-20
                flex
                items-center
                justify-center
                w-8 h-8
                sm:w-11 sm:h-11
                rounded-full
                transition-all
                duration-300
                ${arrowStyle}
              `}
            >
              <FaArrowLeftLong
                className="
                  text-xs
                  sm:text-base
                  transition-transform
                  duration-300
                "
              />
            </button>
          )}

          {/* REVIEW SLIDES */}

          <div
            ref={scrollRef}
            className={`
              flex
              w-full
              overflow-x-auto
              overflow-y-hidden
              snap-x
              snap-mandatory
              scroll-smooth
              overscroll-x-contain

              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden

              ${slideBg}
            `}
            aria-label="Customer reviews"
          >
            {reviews.map((review, index) => (
              <article
                key={review._id || review.id || index}
                className={`
                  flex
                  w-full
                  min-w-full
                  shrink-0
                  snap-start
                  flex-col
                  items-center
                  justify-center
                  min-h-[190px]
                  sm:min-h-[220px]
                  lg:min-h-[290px]
                  px-10
                  sm:px-14
                  lg:px-24
                  py-6
                  sm:py-7
                  lg:py-10
                  text-center
                  ${slideBg}
                `}
              >
                {/* REVIEW TEXT */}

                <p
                  className={`
                    max-w-[950px]
                    text-[15px]
                    sm:text-[18px]
                    md:text-[23px]
                    lg:text-[25px]
                    font-normal
                    leading-[1.55]
                    tracking-[-0.25px]
                    break-words
                    ${primaryText}
                  `}
                >
                  {getComment(review)}
                </p>

                {/* DECORATIVE DIVIDER */}

                <div
                  className={`
                    mt-5
                    sm:mt-6
                    lg:mt-7
                    mb-3
                    sm:mb-4
                    h-px
                    w-8
                    ${
                      isDark
                        ? "bg-[#887A67]"
                        : "bg-[#C7B7A3]"
                    }
                  `}
                />

                {/* CUSTOMER NAME */}

                <p
                  className={`
                    text-[9px]
                    sm:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-medium
                    ${primaryText}
                  `}
                >
                  {getCustomer(review)}
                </p>
              </article>
            ))}
          </div>

          {/* NEXT ARROW */}

          {reviews.length > 1 && (
            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Next review"
              className={`
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                z-20
                flex
                items-center
                justify-center
                w-8 h-8
                sm:w-11 sm:h-11
                rounded-full
                transition-all
                duration-300
                ${arrowStyle}
              `}
            >
              <FaArrowRightLong
                className="
                  text-xs
                  sm:text-base
                  transition-transform
                  duration-300
                  hover:translate-x-1
                "
              />
            </button>
          )}
        </div>

        {/* SLIDER INDICATORS */}

        {reviews.length > 1 && (
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              mt-2
              sm:mt-3
            "
          >
            {reviews.map((review, index) => (
              <button
                key={review._id || review.id || index}
                type="button"
                onClick={() => scrollToReview(index)}
                aria-label={`Go to review ${index + 1}`}
                aria-current={
                  activeIndex === index
                    ? "true"
                    : undefined
                }
                className={`
                  h-[3px]
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    activeIndex === index
                      ? `w-7 ${
                          isDark
                            ? "bg-[#D5C3A9]"
                            : "bg-[#51483C]"
                        }`
                      : `w-2 ${
                          isDark
                            ? "bg-white/20"
                            : "bg-[#D7D1C7]"
                        }`
                  }
                `}
              />
            ))}
          </div>
        )}

        {/* BOTTOM DIVIDER */}

        <div
          className={`
            w-full
            border-b
            mt-6
            sm:mt-8
            lg:mt-11
            ${borderColor}
          `}
        />
      </div>
    </section>
  );
};

export default HomeReviews;
