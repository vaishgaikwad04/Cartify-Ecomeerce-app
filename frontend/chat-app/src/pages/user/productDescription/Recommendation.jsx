import Card from "../../../components/ui/Card";
import { useRecommendation } from "../../../hooks/user/useRecommendation";

const Recommendation = ({ currentId, category }) => {
  // Get recommended products and current theme
  const { products, isDark } = useRecommendation({
    currentId,
    category,
  });

  return (
    <div
      className={`
        w-full
        max-w-[1800px]
        mx-auto

        mt-10
        sm:mt-12
        lg:mt-16

        px-3
        sm:px-4
        lg:px-6

        transition-colors
        duration-300

        ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >

      {/* =====================================================
          SECTION TITLE
      ===================================================== */}
      <h2
        className={`
          text-base
          sm:text-lg
          md:text-xl
          lg:text-2xl

          text-center
          font-semibold

          tracking-wide

          mb-5
          sm:mb-7
          lg:mb-8

          ${
            isDark
              ? "text-white"
              : "text-gray-800"
          }
        `}
      >
        RELATED PRODUCTS
      </h2>


      {/* =====================================================
          RECOMMENDED PRODUCTS
      ===================================================== */}
      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5

          gap-4
          sm:gap-5
          lg:gap-6
        "
      >
        {products.length > 0 ? (

          products.map((item) => (
            <Card
              key={item._id}
              product={item}
            />
          ))

        ) : (

          /* =================================================
              EMPTY STATE
          ================================================= */
          <p
            className={`
              col-span-full

              py-8
              sm:py-10

              text-xs
              sm:text-sm

              text-center

              ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }
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