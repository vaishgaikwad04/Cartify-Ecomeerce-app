import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = ({
  items = [],
  visibleItems = 4,
  renderItem,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentVisibleItems, setCurrentVisibleItems] =
    useState(visibleItems);

  const safeItems = Array.isArray(items) ? items : [];

  // ================= RESPONSIVE VISIBLE ITEMS =================
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setCurrentVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setCurrentVisibleItems(2);
      } else {
        setCurrentVisibleItems(visibleItems);
      }
    };

    updateVisibleItems();

    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, [visibleItems]);

  // ================= RESET SLIDER =================
  useEffect(() => {
    setStartIndex(0);
  }, [items, currentVisibleItems]);

  // ================= NEXT =================
  const nextSlide = () => {
    if (
      startIndex + currentVisibleItems <
      safeItems.length
    ) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // ================= PREVIOUS =================
  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const visibleProducts = safeItems.slice(
    startIndex,
    startIndex + currentVisibleItems
  );

  return (
    <div className="relative w-full min-w-0">

      {/* ================= PREVIOUS BUTTON ================= */}
      <button
        type="button"
        onClick={prevSlide}
        disabled={startIndex === 0}
        aria-label="Previous products"
        className="
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          z-20

          w-7
          h-7

          sm:w-8
          sm:h-8

          md:w-9
          md:h-9

          flex
          items-center
          justify-center

          bg-white
          shadow-md
          rounded-full

          text-gray-700

          disabled:opacity-30
          disabled:cursor-not-allowed

          hover:bg-gray-50

          transition-all
          duration-200
        "
      >
        <ChevronLeft
          className="
            w-3
            h-3
            sm:w-4
            sm:h-4
            md:w-5
            md:h-5
          "
        />
      </button>

      {/* ================= PRODUCTS ================= */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4

          gap-2
          sm:gap-3
          md:gap-4
          lg:gap-5

          px-8
          sm:px-10
          md:px-12

          w-full
          min-w-0
        "
      >
        {visibleProducts.map((product) => (
          <div
            key={product?._id}
            className="
              w-full
              min-w-0
            "
          >
            {renderItem(product)}
          </div>
        ))}
      </div>

      {/* ================= NEXT BUTTON ================= */}
      <button
        type="button"
        onClick={nextSlide}
        disabled={
          startIndex + currentVisibleItems >=
          safeItems.length
        }
        aria-label="Next products"
        className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          z-20

          w-7
          h-7

          sm:w-8
          sm:h-8

          md:w-9
          md:h-9

          flex
          items-center
          justify-center

          bg-white
          shadow-md
          rounded-full

          text-gray-700

          disabled:opacity-30
          disabled:cursor-not-allowed

          hover:bg-gray-50

          transition-all
          duration-200
        "
      >
        <ChevronRight
          className="
            w-3
            h-3
            sm:w-4
            sm:h-4
            md:w-5
            md:h-5
          "
        />
      </button>
    </div>
  );
};

export default Slider;