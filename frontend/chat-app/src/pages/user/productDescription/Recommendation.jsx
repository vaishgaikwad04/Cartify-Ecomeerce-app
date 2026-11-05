
import Card from "../../../components/ui/Card";

// Hooks
import { useRecommendation } from "../../../hooks/user/useRecommendation";
import { useWishlist } from "../../../hooks/user/useWishList";

const Recommendation = ({ currentId, category }) => {
  // ================= RECOMMENDATIONS =================
  const { products, isDark } = useRecommendation({
    currentId,
    category,
  });

  // ================= WISHLIST =================
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <section
      className={`
        w-full
        max-w-[1800px]
        mx-auto
        mt-8
        sm:mt-10
        lg:mt-12
        px-3
        sm:px-4
        lg:px-6
        transition-colors
        duration-300
        ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >
      {/* ================= SECTION TITLE ================= */}
      <div className="mb-5 sm:mb-6 lg:mb-7">
        <h2
          className={`
            text-sm
            sm:text-base
            md:text-lg
            font-semibold
            text-center
            tracking-[1.5px]
            ${isDark ? "text-gray-100" : "text-gray-800"}
          `}
        >
          RELATED PRODUCTS
        </h2>

        <div
          className={`
            w-10
            h-[2px]
            mx-auto
            mt-2
            rounded-full
            ${isDark ? "bg-gray-600" : "bg-gray-300"}
          `}
        />
      </div>

      {/* ================= RECOMMENDED PRODUCTS ================= */}
      {products?.length > 0 ? (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-3
            sm:gap-4
            lg:gap-5
          "
        >
          {products.map((item) => (
            <Card
              key={item._id}
              product={item}
              isWishlisted={isWishlisted(item._id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div
          className={`
            py-8
            sm:py-10
            text-center
            text-xs
            sm:text-sm
            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          No related products available.
        </div>
      )}
    </section>
  );
};

export default Recommendation;
