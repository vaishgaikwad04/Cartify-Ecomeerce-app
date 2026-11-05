
import React from "react";

import ImageCard from "../../../components/ui/ImageCard";
import Card from "../../../components/ui/Card";

import { useFashionPromo } from "../../../hooks/user/useFashionPromo";
import { useWishlist } from "../../../hooks/user/useWishList";

const images = [
  "https://shopjonesandco.com/cdn/shop/files/jones-_-co-glossy-bar-barrette-gold-hair-clip-x7y2z1_50b3496a-3d37-4857-814f-41a9e0038d40.jpg?v=1781663253&width=3000",
  "https://mafoil.wpbingosite.com/wp-content/uploads/2022/12/banner-24.jpg",
];

const FashionPromo = () => {
  const {
    openProductModel,
    setOpenProductModel,
    isDark,
    categories,
  } = useFashionPromo();

  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <section
      className={`
        w-full max-w-[1800px] mx-auto
        px-4 sm:px-8 lg:px-12
        py-14 md:py-20
        transition-colors duration-300
        ${isDark ? "bg-gray-950 text-white" : "bg-[#faf9f7] text-[#171717]"}
      `}
    >
      {/* EDITORIAL HEADER */}
      <div className="flex items-end justify-between mb-8 md:mb-12">

        <div>
          <p className="
            text-[9px] md:text-[10px]
            uppercase tracking-[0.3em]
            text-gray-400 mb-3
          ">
            THE EDIT / 2026
          </p>

          <h2 className="
            text-3xl sm:text-4xl md:text-5xl
            font-normal tracking-tight
          ">
            Shop the Look
          </h2>
        </div>

        <p className="
          hidden sm:block
          text-[10px] tracking-[0.2em]
          uppercase text-gray-400
          pb-2
        ">
          Discover the collection
        </p>

      </div>

      {/* EDITORIAL IMAGE LAYOUT */}
      <div className="
        grid grid-cols-1 md:grid-cols-12
        gap-4 md:gap-5
        items-stretch
      ">

        {images.map((image, index) => {

          const product = categories?.[index];
          const isOpen = openProductModel === index;

          return (
            <div
              key={image}
              className={`
                relative group min-w-0
                ${index === 0
                  ? "md:col-span-7"
                  : "md:col-span-5"
                }
              `}
            >

              {/* IMAGE */}
              <div className={`
                relative w-full overflow-hidden
                bg-[#eeece9]
                ${index === 0
                  ? "aspect-[4/5] md:aspect-[0.91/1]"
                  : "aspect-[4/5] md:aspect-[0.91/1]"
                }
              `}>

                <ImageCard
                  image={image}
                  onClick={() => setOpenProductModel(null)}
                  className="
                    w-full h-full
                    rounded-none
                    overflow-hidden
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.035]
                  "
                />

                {/* SUBTLE IMAGE OVERLAY */}
                <div className="
                  absolute inset-0
                  bg-black/[0.03]
                  pointer-events-none
                  group-hover:bg-transparent
                  transition-all duration-500
                " />

                {/* SMALL EDITORIAL LABEL */}
                <div className="
                  absolute top-5 left-5
                  z-10 pointer-events-none
                ">
                  <span className="
                    bg-white/90
                    px-3 py-2
                    text-[9px]
                    uppercase tracking-[0.18em]
                    text-gray-800
                  ">
                    {index === 0 ? "The Accessories Edit" : "New Season"}
                  </span>
                </div>

                {/* PRODUCT HOTSPOT */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenProductModel(isOpen ? null : index);
                  }}
                  aria-label="View featured product"
                  aria-expanded={isOpen}
                  className="
                    absolute z-20
                    top-1/2 left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-10 h-10
                    rounded-full
                    bg-white
                    text-black
                    flex items-center justify-center
                    shadow-lg
                    border border-white/60
                    transition-transform duration-300
                    hover:scale-110
                    active:scale-95
                  "
                >
                  <span className={`
                    text-xl font-light
                    transition-transform duration-300
                    ${isOpen ? "rotate-45" : ""}
                  `}>
                    +
                  </span>
                </button>

                {/* PRODUCT PREVIEW */}
                {isOpen && product && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`
                      absolute z-30
                      bottom-5
                      ${index === 0 ? "left-5" : "right-5"}
                      w-[min(230px,calc(100%-40px))]
                      rounded-sm overflow-hidden
                      shadow-2xl
                      animate-in fade-in slide-in-from-bottom-2
                      duration-300
                      ${isDark ? "bg-gray-900" : "bg-white"}
                    `}
                  >

                    <button
                      type="button"
                      onClick={() => setOpenProductModel(null)}
                      aria-label="Close preview"
                      className="
                        absolute top-2 right-2 z-50
                        w-7 h-7 rounded-full
                        bg-white text-black
                        shadow flex items-center justify-center
                      "
                    >
                      ×
                    </button>

                    <Card
                      product={product}
                      isWishlisted={isWishlisted(product._id)}
                      onToggleWishlist={toggleWishlist}
                    />

                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default FashionPromo;
