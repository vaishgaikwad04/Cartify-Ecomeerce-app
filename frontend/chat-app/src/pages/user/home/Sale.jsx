import Button from "../../../components/ui/Button";
import ImageCard from "../../../components/ui/ImageCard";
import TextCard from "../../../components/ui/TextCard";
import Card from "../../../components/ui/Card";

// Hooks
import { useSale } from "../../../hooks/user/useSale";
import { useWishlist } from "../../../hooks/user/useWishList";

const Sale = () => {
  // SALE CUSTOM HOOK
  const {
    isDark,
    navigate,
    categories,
    openProductModel,
    setOpenProductModel,
  } = useSale();

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
          <div className="relative" onClick={() => setOpenProductModel(null)}>
            {/* <div
              className="
        relative
        overflow-hidden
        h-[280px]
        sm:h-[360px]
        md:h-[420px]
        lg:h-[440px]
        xl:h-[500px]
      "
            >
              <video
                src="https://shopjonesandco.com/cdn/shop/videos/c/vp/0213a0b961b8456587d256593cc7e79e/0213a0b961b8456587d256593cc7e79e.HD-720p-4.5Mbps-84848524.mp4?v=0"
                autoPlay
                muted
                loop
                playsInline
                className="
          w-full
          h-full
          object-cover
        "
              />

              {/* PLUS BUTTON */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenProductModel("sale-banner");
                }}
                aria-label="View sale product"
                className={`
          absolute

          /* MOBILE */
          top-20
          right-34

          sm:right-84
          sm:top-24

          /* TABLET: 500px → 670px */
          min-[500px]:max-[670px]:right-60
          min-[500px]:max-[670px]:top-24

          /* LARGE — KEEP YOUR EXISTING POSITION */
          lg:top-46
          lg:left-88

          w-7 h-7
          sm:w-8 sm:h-8
          md:w-9 md:h-9
          lg:w-10 lg:h-10

          rounded-full
          flex
          items-center
          justify-center
          shadow-md

          text-sm
          sm:text-base
          md:text-lg
          lg:text-xl

          ${
            isDark
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-white text-black hover:bg-gray-100"
          }
        `}
              >
                +
              </button>
            </div> */}

            {/* PRODUCT POPUP
            {openProductModel === "sale-banner" && categories?.[0] && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="
          absolute
          z-[99999]

          left-44
          top-58
          sm:left-102
          sm:top-64

          
          min-[500px]:max-[670px]:left-80
          min-[500px]:max-[670px]:top-74

   

  lg:!left-[280px]
  lg:!top-[120px]

          w-[140px]
          sm:w-[140px]
          md:w-[240px]
           min-[500px]:max-[670px]:w-[210px]
          lg:w-[242px]
        "
              >
                <div
                  className={`
            w-full
            rounded-lg
            shadow-xl
            p-1
            sm:p-1.5
            md:p-2

            ${isDark ? "bg-gray-900" : "bg-white"}
          `}
                >
                  <Card
                    product={categories[0]}
                    isWishlisted={isWishlisted(categories[0]._id)}
                    onToggleWishlist={toggleWishlist}
                  />
                </div>
              </div>
            )} */}
            <div
  className="
    relative
    overflow-hidden
    h-[280px]
    sm:h-[360px]
    md:h-[420px]
    lg:h-[440px]
    xl:h-[500px]
  "
>
  <video
    src="https://shopjonesandco.com/cdn/shop/videos/c/vp/0213a0b961b8456587d256593cc7e79e/0213a0b961b8456587d256593cc7e79e.HD-720p-4.5Mbps-84848524.mp4?v=0"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />

  {/* PLUS BUTTON */}
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      setOpenProductModel("sale-banner");
    }}
    className={`
      absolute

      top-20
      right-34

      sm:right-84
      sm:top-24

      min-[500px]:max-[670px]:right-60
      min-[500px]:max-[670px]:top-24

      lg:top-46
      lg:left-88

      w-7 h-7
      sm:w-8 sm:h-8
      md:w-9 md:h-9
      lg:w-10 lg:h-10

      rounded-full
      flex
      items-center
      justify-center
      shadow-md

      text-sm
      sm:text-base
      md:text-lg
      lg:text-xl

      ${
        isDark
          ? "bg-gray-900 text-white hover:bg-gray-800"
          : "bg-white text-black hover:bg-gray-100"
      }
    `}
  >
    +
  </button>

  {/* POPUP — NOW ANCHORED TO SAME CONTAINER */}
  {openProductModel === "sale-banner" && categories?.[0] && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        absolute
        z-[99999]

        /* mobile/tablet unchanged */
        left-44
        top-58

        sm:left-102
        sm:top-64

        min-[500px]:max-[670px]:left-80
        min-[500px]:max-[670px]:top-74

        /* desktop */
        lg:left-[300px]
        lg:top-[150px]

        w-[140px]
        sm:w-[140px]
        md:w-[240px]
        min-[500px]:max-[670px]:w-[210px]
        lg:w-[242px]
      "
    >
      <div
        className={`
          w-full
          rounded-lg
          shadow-xl
          p-1
          sm:p-1.5
          md:p-2

          ${isDark ? "bg-gray-900" : "bg-white"}
        `}
      >
        <Card
          product={categories[0]}
          isWishlisted={isWishlisted(categories[0]._id)}
          onToggleWishlist={toggleWishlist}
        />
      </div>
    </div>
  )}
</div>
          </div>

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

        ${isDark ? "bg-gray-900 text-white" : "bg-[#f8f6f6]"}
      `}
            >
              <Button
                onClick={() => {
                  navigate("/sale");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
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
  `}
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
                <div key={product._id} className="min-w-0">
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

                  ${isDark ? "text-gray-300" : "text-gray-700"}
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
