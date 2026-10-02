
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
    <div
      className={`
        max-w-[1700px]
        mx-auto

        px-2
        min-[380px]:px-3
        sm:px-5
        lg:px-6

        py-4
        sm:py-5
      `}
    >
      {/* =====================================================
          FILTER BUTTON
      ===================================================== */}
      <button
        type="button"
        onClick={() => setShowFilter(!showFilter)}
        className={`
          flex
          items-center
          gap-1.5

          mb-5
          sm:mb-6

          text-xs
          sm:text-sm
          font-medium

          transition-colors
          duration-200

          ${
            isDark
              ? "text-gray-300 hover:text-white"
              : "text-gray-700 hover:text-black"
          }
        `}
      >
        <CiFilter className="text-lg sm:text-xl" />

        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>

      {/* =====================================================
          FILTER + PRODUCTS
      ===================================================== */}
      <div
        className="
          flex
          items-start
          gap-2
          min-[380px]:gap-2.5
          sm:gap-5
          md:gap-6
        "
      >
        {/* =================================================
            FILTER SIDEBAR
        ================================================= */}
        <div
          className={`
            shrink-0
            overflow-hidden

            transition-all
            duration-300
            ease-in-out

            ${
              showFilter
                ? "w-[125px] min-[380px]:w-[135px] sm:w-40 md:w-48"
                : "w-0"
            }
          `}
        >
          <div className="py-1 sm:py-4 pr-1">
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

        {/* =================================================
            PRODUCTS
        ================================================= */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <p
              className={`
                text-center
                py-10
                text-sm
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Loading...
            </p>
          ) : filteredData.length === 0 ? (
            <div className="py-16 text-center">
              <p
                className={`
                  text-base
                  sm:text-lg
                  font-medium
                  ${isDark ? "text-gray-300" : "text-gray-600"}
                `}
              >
                No products found
              </p>
            </div>
          ) : (
            <>
              {/* =================================================
                  PRODUCT GRID

                  IMPORTANT:
                  2 columns are kept even on 350px screens.
              ================================================= */}
              <div
                className="
                  grid
                  grid-cols-2

                  gap-x-1.5
                  gap-y-4

                  min-[380px]:gap-x-2
                  min-[380px]:gap-y-5

                  sm:gap-5

                  md:grid-cols-3
                  lg:grid-cols-4
                "
              >
                {filteredData.map((product) => (
                  <Card
                    key={product._id}
                    product={product}
                    isWishlisted={isWishlisted(product._id)}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-10 pb-8 sm:mt-12 sm:pb-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">

                    {/* PREVIOUS */}
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.max(prev - 1, 1)
                        )
                      }
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className={`
                        w-8
                        h-8
                        sm:w-9
                        sm:h-9

                        flex
                        items-center
                        justify-center

                        rounded-full
                        text-sm
                        sm:text-base

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
                        min-w-14
                        text-center
                        text-xs
                        font-medium
                        ${isDark ? "text-gray-300" : "text-gray-600"}
                      `}
                    >
                      {currentPage} / {totalPages}
                    </span>

                    {/* NEXT */}
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className={`
                        w-8
                        h-8
                        sm:w-9
                        sm:h-9

                        flex
                        items-center
                        justify-center

                        rounded-full
                        text-sm
                        sm:text-base

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
