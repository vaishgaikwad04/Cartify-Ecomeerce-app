import React from "react";

import Card from "../../../components/ui/Card";
import Filter from "../../../components/ui/Filter";

import { CiFilter } from "react-icons/ci";

import { useWishlist } from "../../../hooks/user/useWishList";
import { useCategory } from "../../../hooks/user/useCategory";

const Category = () => {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const {
    isDark,
    loading,
    showFilter,
    setShowFilter,
    stockFilter,
    setStockFilter,
    filteredData,
     priceFilter,
    setPriceFilter,

    // Pagination
    currentPage,
    totalPages,
    setCurrentPage,
  } = useCategory();

  return (
    <div className="max-w-[1700px] mx-auto px-6 py-4">
      {/* =========================
          FILTER BUTTON
      ========================= */}
      <button
        type="button"
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center gap-2 mb-6"
      >
        <CiFilter />

        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>

      <div className="flex gap-4 md:gap-6">
        {/* =========================
            FILTER SIDEBAR
   {/* =========================
    FILTER SIDEBAR
========================= */}
<div
  className={`
    shrink-0
    overflow-hidden
    transition-all
    duration-300
    ease-in-out
    ${
      showFilter
        ? "w-32 sm:w-40 md:w-44 lg:w-48"
        : "w-0"
    }
  `}
>
  <div className="py-4 ml-2">

    {/* AVAILABILITY */}
    <Filter
      title="Availability"
      options={[
        {
          label: "In Stock",
          checked: stockFilter === "inStock",
          onChange: () => setStockFilter("inStock"),
        },
        {
          label: "Out Of Stock",
          checked: stockFilter === "outOfStock",
          onChange: () => setStockFilter("outOfStock"),
        },
      ]}
    />

    {/* PRICE */}
    <Filter
      title="Price"
      options={[
        {
          label: "All Prices",
          checked: priceFilter === "all",
          onChange: () => setPriceFilter("all"),
        },
        {
          label: "Under ₹1,000",
          checked: priceFilter === "under1000",
          onChange: () => setPriceFilter("under1000"),
        },
        {
          label: "₹1,000 - ₹2,000",
          checked: priceFilter === "1000to2000",
          onChange: () => setPriceFilter("1000to2000"),
        },
        {
          label: "₹2,000 - ₹5,000",
          checked: priceFilter === "2000to5000",
          onChange: () => setPriceFilter("2000to5000"),
        },
        {
          label: "Above ₹5,000",
          checked: priceFilter === "above5000",
          onChange: () => setPriceFilter("above5000"),
        },
      ]}
    />

  </div>
</div>

        {/* =========================
            PRODUCTS
        ========================= */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : filteredData.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-gray-600">
                No products found
              </p>
            </div>
          ) : (
            <>
              {/* PRODUCT GRID */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {filteredData.map((product) => (
                  <Card
                    key={product._id}
                    product={product}
                    isWishlisted={isWishlisted(product._id)}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>

              {/* =========================
    PAGINATION
========================= */}
             {/* =========================
    PAGINATION
========================= */}
{totalPages > 1 && (
  <div className="flex items-center justify-center mt-12 pb-10">

    <div className="flex items-center gap-2">

      {/* PREVIOUS */}
      <button
        type="button"
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`
          w-9
          h-9
          flex
          items-center
          justify-center
          rounded-full
          text-base
          transition-all
          duration-200

          ${
            currentPage === 1
              ? isDark
                ? "text-gray-700 cursor-not-allowed"
                : "text-gray-300 cursor-not-allowed"
              : isDark
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-black"
          }
        `}
      >
        ←
      </button>

      {/* DESKTOP PAGE NUMBERS */}
      <div className="hidden sm:flex items-center gap-1.5">

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={`
              min-w-9
              h-9
              px-2
              rounded-full
              text-xs
              font-medium
              transition-all
              duration-200

              ${
                currentPage === page
                  ? isDark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDark
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-black hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* MOBILE PAGE INDICATOR */}
      <span
        className={`
          sm:hidden
          min-w-16
          text-center
          text-xs
          font-medium
          ${
            isDark
              ? "text-gray-300"
              : "text-gray-600"
          }
        `}
      >
        {currentPage} / {totalPages}
      </span>

      {/* NEXT */}
      <button
        type="button"
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`
          w-9
          h-9
          flex
          items-center
          justify-center
          rounded-full
          text-base
          transition-all
          duration-200

          ${
            currentPage === totalPages
              ? isDark
                ? "text-gray-700 cursor-not-allowed"
                : "text-gray-300 cursor-not-allowed"
              : isDark
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-black"
          }
        `}
      >
        →
      </button>

    </div>
  </div>
)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
