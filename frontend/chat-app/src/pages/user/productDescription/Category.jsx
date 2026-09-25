import React from "react";
import Card from "../../../components/ui/Card";
import Filter from "../../../components/ui/Filter";
import { CiFilter } from "react-icons/ci";
import { useWishlist } from "../../../hooks/user/useWishList";
import { useCategory } from "../../../hooks/user/useCategory";

const Category = () => {
  // Get wishlist state and wishlist toggle function
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Get category data, filter state, and filter controls
  const {
    loading,
    showFilter,
    setShowFilter,
    stockFilter,
    setStockFilter,
    filteredData,
  } = useCategory();

  return (
    <div className="max-w-[1800px] mx-auto px-6 py-4">
      {/* Toggle filter visibility */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center gap-2 mb-6"
      >
        <CiFilter />
        {showFilter ? "Hide Filter" : "Show Filter"}
      </button>

      <div className="flex gap-4 md:gap-6">
        {/* FILTER */}
        <div
          className={`
            shrink-0
            overflow-hidden
            transition-all
            duration-300
            ${showFilter ? "w-32 sm:w-40 md:w-44 lg:w-48" : "w-0"}
          `}
        >
          <div className="py-4">
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
          </div>
        </div>

        {/* PRODUCTS */}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
