import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";

const Carousel = ({ images = [], product }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  // No images
  if (!images.length) {
    return (
      <div
        className="
          w-full
          h-[160px]
          sm:h-[190px]
          md:h-[240px]
          lg:h-[290px]
          xl:h-[320px]
          2xl:h-[350px]

          flex
          items-center
          justify-center

          bg-gray-100
        "
      >
        <span className="text-xs text-gray-400">No Image</span>
      </div>
    );
  }

  // Next image
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Previous image
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Show second image when hovering
  const handleMouseEnter = () => {
    if (images.length > 1) {
      setCurrentIndex(1);
    }
  };

  // Return to first image
  const handleMouseLeave = () => {
    setCurrentIndex(0);
  };

  return (
    <div
      className="
        relative
        w-full
        max-w-full
        overflow-hidden
        group
      "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ================= IMAGE CONTAINER ================= */}
      <div
        className="
    relative
    w-full
    aspect-[4/5]
    overflow-hidden
  "
      >
        {/* ================= PRODUCT LINK ================= */}
        <Link
          to={`/description/${product?._id}`}
          className="
            absolute
            inset-0
            block
          "
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product?.name || "Product"} ${index + 1}`}
              className={`
                absolute
                inset-0

                w-full
                h-full

                object-cover

                transition-all
                duration-700
                ease-in-out

                group-hover:scale-[1.03]

                ${index === currentIndex ? "opacity-100" : "opacity-0"}
              `}
            />
          ))}
        </Link>

        {/* ================= HOVER OVERLAY ================= */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none

            bg-black/0
            group-hover:bg-black/10

            transition-all
            duration-500
          "
        />

        {/* ================= QUICK ADD ================= */}
        <Button
          label="Quick Add"
          variant="secondary"
          onClick={() => navigate(`/description/${product?._id}`)}
          className="
            absolute
            left-1/2
            -translate-x-1/2

            bottom-1
            sm:bottom-1.5
            md:bottom-2

            !w-[calc(100%-8px)]
            sm:!w-[calc(100%-12px)]
            md:!w-[calc(100%-16px)]
            lg:!w-[calc(100%-18px)]

            !h-[24px]
            sm:!h-[27px]
            md:!h-[30px]

            !min-h-0

            !px-2
            !py-0

            !text-[8px]
            sm:!text-[9px]
            md:!text-[10px]

            opacity-100
            translate-y-0

            sm:opacity-0
            sm:translate-y-2

            sm:group-hover:opacity-100
            sm:group-hover:translate-y-0

            transition-all
            duration-300
          "
        />

        {/* ================= PREVIOUS BUTTON ================= */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous image"
            className="
              absolute

              left-1
              sm:left-1.5
              md:left-2

              top-1/2
              -translate-y-1/2

              w-5
              h-5

              sm:w-6
              sm:h-6

              md:w-7
              md:h-7

              rounded-full

              bg-white/90
              dark:bg-gray-900/90

              text-gray-900
              dark:text-white

              flex
              items-center
              justify-center

              shadow-sm

              opacity-0
              group-hover:opacity-100

              transition-all
              duration-300

              hover:scale-105

              z-10
            "
          >
            <FaArrowLeftLong
              className="
                text-[7px]
                sm:text-[8px]
                md:text-[9px]
              "
            />
          </button>
        )}

        {/* ================= NEXT BUTTON ================= */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next image"
            className="
              absolute

              right-1
              sm:right-1.5
              md:right-2

              top-1/2
              -translate-y-1/2

              w-5
              h-5

              sm:w-6
              sm:h-6

              md:w-7
              md:h-7

              rounded-full

              bg-white/90
              dark:bg-gray-900/90

              text-gray-900
              dark:text-white

              flex
              items-center
              justify-center

              shadow-sm

              opacity-0
              group-hover:opacity-100

              transition-all
              duration-300

              hover:scale-105

              z-10
            "
          >
            <FaArrowRightLong
              className="
                text-[7px]
                sm:text-[8px]
                md:text-[9px]
              "
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
