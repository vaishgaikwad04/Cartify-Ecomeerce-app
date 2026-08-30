import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = ({ items = [], visibleItems = 4, renderItem }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentVisibleItems, setCurrentVisibleItems] =
    useState(visibleItems);

  const safeItems = Array.isArray(items) ? items : [];

  // Responsive number of visible items
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

  // Reset slider when items change
  useEffect(() => {
    setStartIndex(0);
  }, [items]);

  const nextSlide = () => {
    if (startIndex + currentVisibleItems < safeItems.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative">

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        disabled={startIndex === 0}
        className="
          absolute left-0 top-1/2 -translate-y-1/2
          z-10
          p-3
          bg-white
          shadow
          rounded-full
          disabled:opacity-50
        "
      >
        <ChevronLeft size={24} />
      </button>

      {/* Items */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          md:px-10
        "
      >
        {safeItems
          .slice(
            startIndex,
            startIndex + currentVisibleItems
          )
          .map(renderItem)}
      </div>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        disabled={
          startIndex + currentVisibleItems >= safeItems.length
        }
        className="
          absolute right-0 top-1/2 -translate-y-1/2
          z-10
          p-3
          bg-white
          shadow
          rounded-full
          disabled:opacity-50
        "
      >
        <ChevronRight size={24} />
      </button>

    </div>
  );
};

export default Slider;