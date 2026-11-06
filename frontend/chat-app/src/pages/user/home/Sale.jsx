import { useState } from "react";

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

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const closeProductPopup = () => {
    setOpenProductModel(null);
  };

  const handleShopNow = () => {
    navigate("/sale");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProductNavigation = (path) => {
    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // THEME
  const sectionBg = isDark ? "bg-[#111111]" : "bg-[#FAF9F6]";

  const primaryText = isDark ? "text-[#F2EFE9]" : "text-[#282722]";

  const mutedText = isDark ? "text-[#A6A198]" : "text-[#89847B]";

  const borderColor = isDark ? "border-white/10" : "border-[#E8E4DC]";

  return (
    <section
      className={`
        relative
        w-full
        max-w-[1800px]
        mx-auto
        overflow-hidden
        px-3
        sm:px-5
        lg:px-8
        xl:px-12
        py-9
        sm:py-10
        lg:py-16
        transition-colors duration-300
        ${sectionBg}
      `}
    >
      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <div
        className="
          flex flex-row
          items-end
          justify-between
          gap-2
          mb-5
          sm:mb-6
          lg:mb-10
        "
      >
        <div className="min-w-0">
          <p
            className={`
              text-[9px]
              sm:text-[10px]
              uppercase
              tracking-[3px]
              font-medium
              mb-2
              ${mutedText}
            `}
          >
            A little something special
          </p>

          <h2
            className={`
              text-[27px]
              sm:text-[30px]
              md:text-[36px]
              lg:text-[44px]
              font-normal
              leading-tight
              tracking-[-1px]
              ${primaryText}
            `}
          >
            The Sale Edit
          </h2>
        </div>

        <button
          type="button"
          onClick={handleShopNow}
          className={`
            group
            flex items-center gap-2
            shrink-0
            w-fit
            pb-1
            border-b
            text-[9px]
            sm:text-[10px]
            lg:text-[11px]
            uppercase
            tracking-[1px]
            sm:tracking-[1.5px]
            font-medium
            transition-all duration-300
            ${
              isDark
                ? "border-white/30 text-gray-300 hover:text-white hover:border-white"
                : "border-[#BDB8AF] text-[#5D5951] hover:text-black hover:border-black"
            }
          `}
        >
          Shop all offers
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* =====================================================
          MAIN SALE LAYOUT
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-[1.05fr_0.95fr]
          gap-3
          sm:gap-4
          lg:gap-8
          items-start
        "
      >
        {/* =================================================
            LEFT SIDE: CAMPAIGN BANNERS
        ================================================= */}

        <div className="min-w-0 flex flex-col gap-3 sm:gap-4 lg:gap-5">
          {/* MAIN VIDEO CAMPAIGN */}

          <div className="relative group" onClick={closeProductPopup}>
            <div
              className="
                relative
                overflow-hidden
                h-[230px]
                sm:h-[280px]
                md:h-[350px]
                lg:h-[450px]
                xl:h-[520px]
                bg-[#DDD8CF]
              "
            >
              {/* VIDEO */}

              <video
                src="https://shopjonesandco.com/cdn/shop/videos/c/vp/0213a0b961b8456587d256593cc7e79e/0213a0b961b8456587d256593cc7e79e.HD-720p-4.5Mbps-84848524.mp4?v=0"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={() => setIsVideoLoaded(true)}
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  transition-transform duration-[1200ms]
                  group-hover:scale-[1.025]
                "
              />

              {/* EDITORIAL OVERLAY */}

              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-black/5
                  pointer-events-none
                "
              />

              {/* PRODUCT HOTSPOT */}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  setOpenProductModel(
                    openProductModel === "sale-banner" ? null : "sale-banner",
                  );
                }}
                aria-label="View featured sale product"
                aria-expanded={openProductModel === "sale-banner"}
                className={`
                  absolute
                  top-[36%]
                  right-[25%]
                  sm:top-[35%]
                  sm:right-[27%]
                  lg:top-[34%]
                  lg:right-[29%]
                  z-20
                  flex items-center justify-center
                  w-7 h-7
                  sm:w-8 sm:h-8
                  lg:w-10 lg:h-10
                  rounded-full
                  border
                  border-white/80
                  shadow-lg
                  backdrop-blur-md
                  transition-all duration-300
                  hover:scale-110
                  ${
                    isDark
                      ? "bg-[#171717]/80 text-white"
                      : "bg-white/90 text-[#25231F]"
                  }
                `}
              >
                <span
                  className={`
                    text-xl
                    font-light
                    transition-transform duration-300
                    ${openProductModel === "sale-banner" ? "rotate-45" : ""}
                  `}
                >
                  +
                </span>
              </button>

              {/* TOP RIGHT LABEL */}

              <div
                className="
                  absolute
                  top-3 right-3
                  sm:top-4 sm:right-4
                  lg:top-7 lg:right-7
                  pointer-events-none
                  text-white
                  text-[7px]
                  sm:text-[8px]
                  lg:text-[9px]
                  tracking-[1.5px]
                  sm:tracking-[2px]
                  uppercase
                "
              >
                Limited Collection
              </div>
            </div>

            {/* FEATURED PRODUCT POPUP */}

            {openProductModel === "sale-banner" && categories?.[0] && (
              <>
                <div
                  className="
                      fixed inset-0
                      z-[80]
                      bg-black/10
                    "
                  onClick={closeProductPopup}
                />

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="
                      absolute
                      z-[90]
                     top-12
right-3
sm:top-16
sm:right-4
lg:top-54
lg:right-6
                
                      w-[155px]
                      sm:w-[180px]
                      md:w-[225px]
                      lg:w-[235px]
                      max-w-[65%]
                      animate-[fadeIn_.2s_ease-out]
                    "
                >
                  <div
                    className={`
                        relative
                        p-2
                        shadow-[0_12px_45px_rgba(0,0,0,0.2)]
                        ${isDark ? "bg-[#202020]" : "bg-white"}
                      `}
                  >
                    {/* <button
                        type="button"
                        onClick={closeProductPopup}
                        aria-label="Close product preview"
                        className={`
                          absolute
                          top-2 right-2
                          z-20
                          w-7 h-7
                          flex items-center justify-center
                          rounded-full
                          shadow-sm
                          ${
                            isDark
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          }
                        `}
                      >
                        ×
                      </button> */}

                    <Card
                      product={categories[0]}
                      isWishlisted={isWishlisted(categories[0]._id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* SECONDARY PROMOTIONAL BANNERS */}

          <div
            className="
              grid
              grid-cols-2
              gap-2
              sm:gap-3
              lg:gap-4
            "
          >
            {/* ACCESSORIES IMAGE */}

            <div className="relative group overflow-hidden min-w-0">
              <ImageCard
                image="https://shopjonesandco.com/cdn/shop/files/jones-plus-co-rider-s-taupe-leather-bag_50f3d876-73b8-4b79-be64-0f742840c07c.png?v=1790204313&width=3000"
                className="
                  h-[170px]
                  sm:h-[190px]
                  md:h-[240px]
                  lg:h-[290px]
                  xl:h-[350px]
                  transition-transform duration-700
                  group-hover:scale-[1.02]
                "
                onClick={() => handleProductNavigation("/accessories")}
              />

              {/* OFFER LABEL */}

              <div
                className="
                  absolute
                  left-0
                  top-1/2
                  -translate-y-1/2
                  z-10
                  pointer-events-none
                  px-2
                  sm:px-3
                  lg:px-5
                  py-2
                  sm:py-3
                  lg:py-4
                  bg-[#F8F5EF]/95
                  text-[#292722]
                  shadow-md
                "
              >
                <p
                  className="
                    text-[7px]
                    sm:text-[8px]
                    lg:text-[9px]
                    uppercase
                    tracking-[1px]
                    sm:tracking-[2px]
                    mb-1
                  "
                >
                  Selected styles
                </p>

                <p
                  className="
                    text-base
                    sm:text-xl
                    lg:text-3xl
                    leading-none
                  "
                >
                  40% OFF
                </p>
              </div>
            </div>

            {/* SUMMER SALE TEXT CARD */}

            <div className="relative overflow-hidden min-w-0">
              <TextCard
                subtitle="Limited Offer"
                title="Summer Sale"
                description="A little more style, for a little less. Enjoy up to 50% off on selected favourites."
                className={`
                  relative
                  h-[170px]
                  sm:h-[190px]
                  md:h-[240px]
                  lg:h-[290px]
                  xl:h-[350px]
                  !p-2
                  sm:!p-3
                  lg:!p-6
                  flex flex-col
                  justify-center
                  !rounded-none
                  transition-colors duration-300
                  ${
                    isDark
                      ? "!bg-[#24231F] !text-[#F2EFE9]"
                      : "!bg-[#EDE9E1] !text-[#292722]"
                  }
                `}
              >
                <div className="mb-2 sm:mb-3">
                  <p
                    className={`
                      text-[7px]
                      sm:text-[8px]
                      lg:text-[9px]
                      uppercase
                      tracking-[1px]
                      sm:tracking-[2px]
                      mb-1 sm:mb-2
                      ${mutedText}
                    `}
                  >
                    A special edit
                  </p>

                  <div
                    className={`
                      w-6 sm:w-7 lg:w-8 h-[1px]
                      ${isDark ? "bg-white/30" : "bg-black/30"}
                    `}
                  />
                </div>

                <Button
                  onClick={handleShopNow}
                  label="Shop Now"
                  variant="primary"
                  className={`
                    !ml-0
                    !mt-2
                    !px-2
                    !py-1
                    !text-[8px]
                    sm:!px-3
                    sm:!py-1.5
                    sm:!text-[9px]
                    lg:!px-5
                    lg:!py-2.5
                    lg:!text-[10px]
                    !rounded-none
                    !tracking-[1px]
                    !uppercase
                    transition-all duration-300
                    hover:translate-y-[-2px]
                    hover:shadow-lg
                  `}
                />
              </TextCard>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE: FEATURED PRODUCTS
        ================================================= */}

        <div className="min-w-0">
          {/* PRODUCT SECTION HEADER */}

          <div
            className={`
              flex items-center justify-between
              mb-3
              sm:mb-4
              lg:mb-5
              pb-2
              sm:pb-3
              border-b
              ${borderColor}
            `}
          ></div>

          {/* PRODUCT GRID */}

          {categories?.length > 0 ? (
            <div
              className="
                grid
                grid-cols-2
                gap-x-2
                gap-y-4
                sm:gap-x-3
                sm:gap-y-5
                lg:gap-x-4
                xl:gap-x-5
              "
            >
              {categories.slice(0, 4).map((product) => (
                <div key={product._id} className="min-w-0 group">
                  <Card
                    product={product}
                    isWishlisted={isWishlisted(product._id)}
                    onToggleWishlist={toggleWishlist}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`
                flex flex-col items-center justify-center
                min-h-[200px]
                sm:min-h-[250px]
                border
                ${borderColor}
              `}
            >
              <p
                className={`
                  text-lg
                  sm:text-xl
                  ${primaryText}
                `}
              >
                Nothing here just yet
              </p>

              <p
                className={`
                  mt-2
                  text-[10px]
                  sm:text-xs
                  ${mutedText}
                `}
              >
                New selections are coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sale;
