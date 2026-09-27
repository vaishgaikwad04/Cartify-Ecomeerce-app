import Card from "../../../components/ui/Card";
import Slider from "../../../components/ui/Slider";
//hooks
import { useWishlist } from "../../../hooks/user/useWishList";
import { useNewArrivals } from "../../../hooks/user/useNewArrivals";

const NewArrivals = () => {
  // NEW ARRIVALS HOOK
  const { categories, isDark } = useNewArrivals();

  // WISHLIST HOOK
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
  <section
  className={`
    max-w-[1800px]
    mx-auto

    px-4
    sm:px-6
    lg:px-10

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
        lg:text-xl

        font-semibold

        ${isDark ? "text-white" : "text-gray-800"}
      `}
    >
      New Arrivals
    </h2>

    <p
      className={`
        mt-1
        text-[11px]
        sm:text-xs
        lg:text-sm

        ${isDark ? "text-gray-400" : "text-gray-500"}
      `}
    >
      Explore our newest arrivals
    </p>
  </div>

  {/* PRODUCT SLIDER */}
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
</section>
  );
};

export default NewArrivals;
