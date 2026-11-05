
import React from "react";

import Card from "../../../components/ui/Card";
import Filter from "../../../components/ui/Filter";

import { CiFilter } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

    currentPage,
    totalPages,
    setCurrentPage,
  } = useCategory();

  const mainText = isDark
    ? "text-[#F1EEE8]"
    : "text-[#292722]";

  const secondaryText = isDark
    ? "text-gray-400"
    : "text-[#858078]";

  const borderColor = isDark
    ? "border-white/10"
    : "border-[#EAE6DF]";

  const mutedBg = isDark
    ? "bg-white/[0.04]"
    : "bg-[#F5F3EF]";

  return (
    <section
      className={`
        max-w-[1700px]
        mx-auto
        px-3
        min-[380px]:px-3.5
        sm:px-5
        lg:px-8
        py-5
        sm:py-7
        lg:py-9
      `}
    >
      {/* =====================================================
          FILTER TOOLBAR
      ===================================================== */}

      <div
        className={`
          flex items-center justify-between
          mb-4 sm:mb-5 lg:mb-6
          pb-3
          border-b
          ${borderColor}
        `}
      >
        <button
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          aria-expanded={showFilter}
          className={`
            group
            flex items-center gap-2
            text-[10px]
            sm:text-[11px]
            uppercase
            tracking-[1.5px]
            font-medium
            transition-colors duration-200
            ${mainText}
            ${isDark ? "hover:text-white" : "hover:text-black"}
          `}
        >
          <CiFilter
            className="
              text-base
              sm:text-lg
              transition-transform
              duration-300
              group-hover:rotate-12
            "
          />

          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <span
          className={`
            text-[9px]
            sm:text-[10px]
            tracking-[1px]
            uppercase
            ${secondaryText}
          `}
        >
          {filteredData.length} Products
        </span>
      </div>

      {/* =====================================================
          FILTER + PRODUCTS
      ===================================================== */}

      <div className="flex items-start gap-2.5 sm:gap-5 lg:gap-7">

        {/* =================================================
            FILTER SIDEBAR
        ================================================= */}

        <aside
          className={`
            shrink-0
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${
              showFilter
                ? "w-[125px] min-[380px]:w-[140px] sm:w-[180px] lg:w-[205px]"
                : "w-0"
            }
          `}
        >
          <div
            className={`
              pr-2
              sm:pr-3
              ${
                showFilter
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }
              transition-opacity duration-200
            `}
          >
            {/* FILTER HEADING */}

            <div
              className={`
                hidden sm:flex
                items-center justify-between
                pb-3 mb-3
                border-b
                ${borderColor}
              `}
            >
              <span
                className={`
                  text-[10px]
                  uppercase
                  tracking-[1.5px]
                  font-medium
                  ${mainText}
                `}
              >
                Filters
              </span>

              <CiFilter
                className={`text-lg ${secondaryText}`}
              />
            </div>

            {/* AVAILABILITY */}

            <div className="mb-4 sm:mb-6">
              <Filter
                title="Availability"
                options={[
                  {
                    label: "In Stock",
                    checked: stockFilter === "inStock",
                    onChange: () => {
                      setStockFilter("inStock");
                      setCurrentPage(1);
                    },
                  },
                  {
                    label: "Out Of Stock",
                    checked: stockFilter === "outOfStock",
                    onChange: () => {
                      setStockFilter("outOfStock");
                      setCurrentPage(1);
                    },
                  },
                ]}
              />
            </div>

            {/* PRICE */}

            <Filter
              title="Price"
              options={[
                {
                  label: "All Prices",
                  checked: priceFilter === "all",
                  onChange: () => {
                    setPriceFilter("all");
                    setCurrentPage(1);
                  },
                },
                {
                  label: "Under ₹1,000",
                  checked: priceFilter === "under1000",
                  onChange: () => {
                    setPriceFilter("under1000");
                    setCurrentPage(1);
                  },
                },
                {
                  label: "₹1,000 - ₹2,000",
                  checked: priceFilter === "1000to2000",
                  onChange: () => {
                    setPriceFilter("1000to2000");
                    setCurrentPage(1);
                  },
                },
                {
                  label: "₹2,000 - ₹5,000",
                  checked: priceFilter === "2000to5000",
                  onChange: () => {
                    setPriceFilter("2000to5000");
                    setCurrentPage(1);
                  },
                },
                {
                  label: "Above ₹5,000",
                  checked: priceFilter === "above5000",
                  onChange: () => {
                    setPriceFilter("above5000");
                    setCurrentPage(1);
                  },
                },
              ]}
            />
          </div>
        </aside>

        {/* =================================================
            PRODUCTS SECTION
        ================================================= */}

        <div className="flex-1 min-w-0">

          {/* LOADING */}

          {loading ? (
            <div
              className={`
                flex items-center justify-center
                min-h-[250px]
                text-[11px]
                uppercase
                tracking-[2px]
                ${secondaryText}
              `}
            >
              Loading products...
            </div>
          ) : filteredData.length === 0 ? (

            /* EMPTY STATE */

            <div
              className={`
                flex flex-col items-center justify-center
                min-h-[260px]
                text-center
                border
                ${borderColor}
                ${mutedBg}
              `}
            >
              <p
                className={`
                  text-base
                  sm:text-lg
                  font-normal
                  ${mainText}
                `}
              >
                No products found
              </p>

              <p
                className={`
                  mt-2
                  text-[10px]
                  sm:text-xs
                  ${secondaryText}
                `}
              >
                Try changing your filters to discover more.
              </p>

              <button
                type="button"
                onClick={() => {
                  setStockFilter("all");
                  setPriceFilter("all");
                  setCurrentPage(1);
                }}
                className={`
                  mt-4
                  text-[9px]
                  uppercase
                  tracking-[1.5px]
                  border-b
                  pb-1
                  transition-colors
                  ${mainText}
                  ${borderColor}
                `}
              >
                Clear Filters
              </button>
            </div>

          ) : (
            <>
              {/* PRODUCT GRID */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-x-2
                  gap-y-5

                  min-[380px]:gap-x-2.5
                  min-[380px]:gap-y-6

                  sm:gap-x-4
                  sm:gap-y-7

                  lg:grid-cols-3
                  xl:grid-cols-4
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
                <div
                  className={`
                    flex items-center justify-center
                    mt-9
                    sm:mt-11
                    lg:mt-14
                    pt-4
                    border-t
                    ${borderColor}
                  `}
                >
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
                        flex items-center justify-center
                        w-8 h-8
                        sm:w-9 sm:h-9
                        rounded-full
                        transition-all duration-200
                        ${
                          currentPage === 1
                            ? isDark
                              ? "text-gray-700 cursor-not-allowed"
                              : "text-gray-300 cursor-not-allowed"
                            : isDark
                              ? "text-gray-300 hover:bg-white/10 hover:text-white"
                              : "text-gray-500 hover:bg-black/5 hover:text-black"
                        }
                      `}
                    >
                      <FiChevronLeft size={17} />
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
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          className={`
                            min-w-9
                            h-9
                            px-2
                            rounded-full
                            text-[10px]
                            font-medium
                            transition-all duration-200
                            ${
                              currentPage === page
                                ? isDark
                                  ? "bg-[#D7C5AA] text-[#29251F]"
                                  : "bg-[#292722] text-[#F7F3EB]"
                                : isDark
                                  ? "text-gray-400 hover:bg-white/10 hover:text-white"
                                  : "text-gray-500 hover:bg-black/5 hover:text-black"
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
                        text-[10px]
                        tracking-[1px]
                        ${secondaryText}
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
                        flex items-center justify-center
                        w-8 h-8
                        sm:w-9 sm:h-9
                        rounded-full
                        transition-all duration-200
                        ${
                          currentPage === totalPages
                            ? isDark
                              ? "text-gray-700 cursor-not-allowed"
                              : "text-gray-300 cursor-not-allowed"
                            : isDark
                              ? "text-gray-300 hover:bg-white/10 hover:text-white"
                              : "text-gray-500 hover:bg-black/5 hover:text-black"
                        }
                      `}
                    >
                      <FiChevronRight size={17} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Category;
