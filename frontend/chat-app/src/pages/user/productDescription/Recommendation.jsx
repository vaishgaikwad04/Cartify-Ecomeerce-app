import Card from "../../../components/ui/Card";
import { useRecommendation } from "../../../hooks/user/useRecommendation";

const Recommendation = ({ currentId, category }) => {
  // Get recommended products and current theme
  const { products, isDark } = useRecommendation({ currentId, category });

  return (
    <div
      className={`
      max-w-[1800px]
      mx-auto
      mt-12
      px-4

      transition-colors duration-300

      ${isDark ? "bg-gray-950" : "bg-white"}

      `}
    >
      {/* Section title */}
      <h2
        className={`
        text-2xl
        text-center
        font-semibold
        mb-5

        ${isDark ? "text-white" : "text-gray-800"}

        `}
      >
        RELATED PRODUCTS
      </h2>

      {/* Display recommended products */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {products.length > 0 ? (
          products.map((item) => <Card key={item._id} product={item} />)
        ) : (
          // Show message when no related products are available
          <p
            className={`
              text-sm
              col-span-full
              text-center

              ${isDark ? "text-gray-400" : "text-gray-500"}

              `}
          >
            No related products
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;