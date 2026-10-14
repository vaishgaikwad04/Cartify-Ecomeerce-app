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
  "https://shopjonesandco.com/cdn/shop/files/jones-_-co-glossy-bar-barrette-gold-hair-clip-x7y2z1_50b3496a-3d37-4857-814f-41a9e0038d40.jpg?v=1781663253&width=3000",
  "https://mafoil.wpbingosite.com/wp-content/uploads/2022/12/banner-24.jpg",
];

const FashionPromo = () => {
  // FASHION PROMO HOOK
  const { openProductModel, setOpenProductModel, isDark, categories } =
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
        <div key={index} className="relative min-w-0">
          {/* IMAGE */}
          <ImageCard
            image={image}
            onClick={() => {
              if (openProductModel !== null) {
                setOpenProductModel(null);
              }
            }}
            className="
        aspect-[2/4] lg:aspect-[5/4]
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

  -translate-x-4

  lg:mb-32

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

          {openProductModel === index && categories?.[index] && (
            <div
              onClick={(e) => e.stopPropagation()}
             className={`
  absolute
  z-[99999]
  top-24

  ${index === 0 ? "left-2" : "right-2"}

  min-[500px]:max-[670px]:top-24

  min-[1108px]:!left-[250px]
  min-[1108px]:!top-[100px]
  min-[1108px]:!right-auto
  min-[1108px]:!ml-0

  w-[110px]
  sm:w-[120px]
  md:w-[150px]
  min-[500px]:max-[670px]:w-[180px]
  min-[1108px]:!w-[240px]
`}
            >
              <div
             className={`
  absolute
  z-[99999]
  top-28

  ${index === 0 ? "left-2" : "right-2"}

  min-[500px]:max-[670px]:top-28

  min-[1108px]:!left-[250px]
  min-[1108px]:!top-[100px]
  min-[1108px]:!right-auto
  min-[1108px]:!ml-0

  w-[110px]
  sm:w-[120px]
  md:w-[150px]
  min-[500px]:max-[670px]:w-[180px]
  min-[1108px]:!w-[240px]
`}
              >
                <Card
                  product={categories[index]}
                  isWishlisted={isWishlisted(categories[index]._id)}
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
