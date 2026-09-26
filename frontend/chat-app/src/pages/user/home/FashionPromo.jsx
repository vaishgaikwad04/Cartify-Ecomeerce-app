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

    sm:gap-2
    md:gap-3
    lg:gap-4

    ${isDark ? "bg-gray-950" : "bg-white"}
  `}
>
  {images.map((image, index) => (
  <div
    key={index}
    className="relative min-w-0"
  >
    {/* IMAGE */}
    <ImageCard
      image={image}
      onClick={() => {
        if (openProductModel !== null) {
          setOpenProductModel(null);
        }
      }}
      className="
        aspect-[5/4]
        w-full
        rounded
      "
    >
      {/* PLUS BUTTON */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpenProductModel(index);
        }}
        aria-label={`View product ${index + 1}`}
        className={`
          w-7 h-7
          sm:w-8 sm:h-8
          md:w-9 md:h-9
          lg:w-10 lg:h-10

          rounded-full
          flex items-center justify-center
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
    </ImageCard>

   {/* POPUP — RIGHT SIDE */}
{openProductModel === index && products?.length > 0 && (
  <div
  onClick={(e) => e.stopPropagation()}
  className="
    absolute
    top-94
    left-112
    ml-3

    z-[99999]

    w-[90px]
    sm:w-[120px]
    md:w-[150px]
    lg:w-[172px]
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
        product={products[0]}
        isWishlisted={isWishlisted(products[0]._id)}
        onToggleWishlist={toggleWishlist}
      />
    </div>
  </div>
)}
  </div>
))}
</div>
  );
};

export default FashionPromo;
