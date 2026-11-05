
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
        mx-auto
        px-3 sm:px-5 lg:px-8 xl:px-10
        py-8 sm:py-10 lg:py-14
        transition-colors duration-300
        ${
          isDark
            ? "bg-gray-950"
            : "bg-[#FAF9F7]"
        }
      `}
    >
      {/* SECTION HEADER */}
      <div className="relative text-left mb-7 sm:mb-9 lg:mb-11 p-8">

        {/* EDITORIAL LABEL */}
        <p
          className={`
            mb-3
            text-[9px] sm:text-[10px]
            tracking-[3px]
            uppercase
            font-medium
            ${
              isDark
                ? "text-gray-500"
                : "text-gray-400"
            }
          `}
        >
          The Edit / New Season
        </p>

        {/* HEADING */}
        <h2
          className={`
      
            text-[27px]
            sm:text-3xl
            lg:text-[38px]
            font-normal
            tracking-[-0.8px]
            leading-tight
            ${
              isDark
                ? "text-gray-100"
                : "text-[#242424]"
            }
          `}
        >
          New Arrivals
        </h2>

       
      </div>

      {/* PRODUCT SLIDER */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div
            className={`
              w-8 h-8
              rounded-full
              border-2
              animate-spin
              ${
                isDark
                  ? "border-gray-700 border-t-gray-200"
                  : "border-gray-200 border-t-gray-900"
              }
            `}
          />
        </div>
      ) : categories?.length === 0 ? (
        <div className="text-center py-16">
          <p
            className={`text-sm ${
              isDark
                ? "text-gray-400"
                : "text-gray-500"
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
