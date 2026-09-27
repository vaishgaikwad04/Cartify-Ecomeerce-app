
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
            image="https://shopjonesandco.com/cdn/shop/files/jones-co-plumping-eye-masks-hyaluronic-acid-skincare-a1b2c3d4_dae5af66-a0d7-4602-9d22-20b8d0a34b4f.jpg?v=1780606122&width=3000"
            className="
              h-[280px]
              sm:h-[360px]
              md:h-[420px]
              lg:h-[440px]
              xl:h-[500px]
            "
            onClick={() => navigate("/beauty")}
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
              image="https://shopjonesandco.com/cdn/shop/files/jones-plus-co-rider-s-taupe-leather-bag_50f3d876-73b8-4b79-be64-0f742840c07c.png?v=1790204313&width=3000"
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