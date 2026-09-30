import Card from "../../../components/ui/Card";
import Slider from "../../../components/ui/Slider";

// hooks
import { useWishlist } from "../../../hooks/user/useWishList";
import { useNewArrivals } from "../../../hooks/user/useNewArrivals";

const NewArrivals = () => {
  // NEW ARRIVALS HOOK
  const { categories, isDark, loading } = useNewArrivals();

  // WISHLIST HOOK
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <section
      className={`
        max-w-[1800px]
        lg:mt-18
        mx-auto
        px-3
        sm:px-4
        lg:px-6
        xl:px-8

        py-3
        sm:py-4

        transition-colors
        duration-300

        ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >
      {/* SECTION HEADER */}
      <div className="text-center mb-4 sm:mb-5">
        <h2
          className={`
            text-base
            sm:text-lg
            lg:text-2xl
            font-semibold
            ${isDark ? "text-white" : "text-gray-800"}
          `}
        >
          New Arrivals
        </h2>

        <p
          className={`
            text-[11px]
            sm:text-xs
            lg:text-sm
            py-2
            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          Explore our newest arrivals
        </p>
      </div>

      {/* PRODUCT SLIDER */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div
            className={`
              w-8
              h-8
              rounded-full
              border-2
              animate-spin
              ${
                isDark
                  ? "border-gray-700 border-t-white"
                  : "border-gray-200 border-t-black"
              }
            `}
          />
        </div>
      ) : categories?.length === 0 ? (
        <div className="text-center py-16">
          <p
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No new arrivals found.
          </p>
        </div>
      ) : (
        <Slider
          items={categories}
          visibleItems={4}
          renderItem={(product) => (
            <Card
              key={product._id}
              product={product}
              isWishlisted={isWishlisted(product._id)}
              onToggleWishlist={toggleWishlist}
            />
          )}
        />
      )}
    </section>
  );
};

export default NewArrivals;