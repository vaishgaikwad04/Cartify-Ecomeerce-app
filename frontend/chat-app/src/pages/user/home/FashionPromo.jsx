import React from "react";

// Reusable components
import ImageCard from "../../../components/ui/ImageCard";
import Card from "../../../components/ui/Card";

// Fashion Promo custom hook
import { useFashionPromo } from "../../../hooks/user/useFashionPromo";

// Wishlist custom hook
import { useWishlist } from "../../../hooks/user/useWishList";

// FASHION PROMO IMAGES
const images = [
  "https://mafoil.wpbingosite.com/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/lookbook-2.jpg",
  "https://mafoil.wpbingosite.com/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/lookbook-1.jpg",
];

const FashionPromo = () => {
  // FASHION PROMO HOOK
  const { openProductModel, setOpenProductModel, isDark, products } =
    useFashionPromo();

  // WISHLIST
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <div
      className={`
        max-w-[1800px]
        mx-auto
        px-4
        sm:px-6
        lg:px-10
        py-12
        grid
        grid-cols-2
        md:grid-cols-2
        sm:gap-2
        md:gap-3
        lg:gap-4

        transition-colors
        duration-300

        ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >
      {/* PROMO IMAGES */}
      {images.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          onClick={() => {
            if (openProductModel !== null) {
              setOpenProductModel(null);
            }
          }}
          className="
  aspect-[3/4]
  w-full
  rounded
"
        >
          <div className="relative z-50">
            {/* PLUS BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenProductModel(index);
              }}
              aria-label={`View product ${index + 1}`}
              className={`
                w-10
                h-10
                rounded-full

                flex
                items-center
                justify-center

                shadow-md
                text-xl

                transition-all
                duration-200

                ${
                  isDark
                    ? `
                      bg-gray-900
                      text-white
                      hover:bg-gray-800
                    `
                    : `
                      bg-white
                      text-black
                      hover:bg-gray-100
                    `
                }
              `}
            >
              +
            </button>

            {/* PRODUCT POPUP */}
            {openProductModel === index && products?.length > 0 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                    absolute
                    top-12
                    left-0
                    z-[9999]
                    w-[192px]
                    sm:w-[172px]
                    max-w-[calc(100vw-2rem)]
                  "
              >
                <div
                  className={`
                      relative
                      w-full
                      rounded-xl
                      shadow-xl
                      p-2
                      overflow-hidden

                      ${isDark ? "bg-gray-900" : "bg-white"}
                    `}
                >
                  {/* PRODUCT CARD */}
                  <Card
                    product={products[0]}
                    isWishlisted={isWishlisted(products[0]._id)}
                    onToggleWishlist={toggleWishlist}
                  />
                </div>
              </div>
            )}
          </div>
        </ImageCard>
      ))}
    </div>
  );
};

export default FashionPromo;
