
import Button from "../../../components/ui/Button";
import ImageCard from "../../../components/ui/ImageCard";
import TextCard from "../../../components/ui/TextCard";
import Card from "../../../components/ui/Card";

// Hooks
import { useSale } from "../../../hooks/user/useSale";
import { useWishlist } from "../../../hooks/user/useWishList";

const Sale = () => {
  // SALE CUSTOM HOOK
  const { isDark, navigate, categories } = useSale();

  // WISHLIST CUSTOM HOOK
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <section
      className={`
        w-full
        max-w-[1800px]
        mx-auto

        px-3
        sm:px-5
        lg:px-8
        xl:px-10

        py-8
        sm:py-10
        lg:py-16

        transition-colors
        duration-300

        ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >
      {/* MAIN SALE LAYOUT */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-5
          sm:gap-6
          lg:gap-8
        "
      >
        {/* LEFT SIDE: PROMOTIONAL BANNERS */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">

          {/* LARGE PROMOTIONAL IMAGE */}
          <ImageCard
            image="https://mafoil.wpbingosite.com/wp-content/uploads/2022/11/banner-21.jpg"
            className="
              h-[280px]
              sm:h-[360px]
              md:h-[420px]
              lg:h-[440px]
              xl:h-[500px]
            "
            onClick={() => navigate("/body")}
          />

          {/* SMALL IMAGE + TEXT CARD */}
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:gap-4
            "
          >
            {/* SECOND BANNER */}
            <ImageCard
              image="https://mafoil.wpbingosite.com/wp-content/uploads/2022/11/banner-22.jpg"
              className="
                h-[220px]
                sm:h-[280px]
                md:h-[320px]
                lg:h-[300px]
                xl:h-[360px]
              "
              onClick={() => navigate("/accessories")}
            />

            {/* TEXT CARD */}
            <TextCard
              subtitle="Limited Offer"
              title="Summer Sale"
              description="Up to 50% off on selected items"
              className={`
                h-[220px]
                sm:h-[280px]
                md:h-[320px]
                lg:h-[300px]
                xl:h-[360px]

                !p-3
                sm:!p-4
                md:!p-5

                ${
                  isDark
                    ? "bg-gray-900 text-white"
                    : "bg-[#f8f6f6]"
                }
              `}
            >
              <Button
                label="Shop Now"
                variant="primary"
                className={`
                  !ml-0

                  !px-3
                  !py-1.5
                  !text-[10px]

                  sm:!px-4
                  sm:!py-2
                  sm:!text-xs

                  md:!px-5
                  md:!py-2
                  md:!text-sm

                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-lg

                  ${
                    isDark
                      ? "bg-gray-900 text-white hover:bg-gray-600"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-300"
                  }
                `}
                onClick={() => {
                  navigate("/");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            </TextCard>
          </div>
        </div>

        {/* RIGHT SIDE: PRODUCTS */}
        <div className="min-w-0">
          {categories?.length > 0 ? (
            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:gap-4
                md:grid-cols-2
              "
            >
              {categories.slice(0, 4).map((product) => (
                <div
                  key={product._id}
                  className="min-w-0"
                >
                  <Card
                    product={product}
                    isWishlisted={isWishlisted(product._id)}
                    onToggleWishlist={toggleWishlist}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[200px]">
              <p
                className={`
                  text-sm
                  sm:text-base

                  ${
                    isDark
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                `}
              >
                No categories found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sale;