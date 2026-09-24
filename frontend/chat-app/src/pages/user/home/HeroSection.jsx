
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import ImageCard from "../../../components/ui/ImageCard";

// Array of banner images
const banners = [
  {
    image:
      "https://mafoil.wpbingosite.com/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/lookbook-7.jpg",
    title: "Clothing",
    subtitle: "New Collection",
    route: "/body",
  },
  {
    image:
      "https://mafoil.wpbingosite.com/wp-content/uploads/2022/11/banner-12.jpg",
    title: "Accessories",
    subtitle: "Trending Style",
    route: "/accessories",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-[1800px] mx-auto px-2 sm:px-3 lg:px-5">
      {/* Two banners remain side-by-side on all screen sizes */}
      <div className="grid grid-cols-2 ">
        {banners.map((banner, index) => (
          <ImageCard
            key={index}
            image={banner.image}
            className="
              h-[300px]
              sm:h-[400px]
              md:h-[500px]
              lg:h-[620px]
              xl:h-[720px]
            "
          >
            {/* Banner content */}
            <div
              className="
                absolute
                inset-x-0
                bottom-6
                sm:bottom-8
                md:bottom-10
                lg:bottom-14
                xl:bottom-16
                z-10
                flex
                flex-col
                items-center
                text-center
                text-white
                px-2
              "
            >
              {/* Subtitle */}
              <p
                className="
                  uppercase
                  tracking-[1px]
                  sm:tracking-[1.5px]
                  md:tracking-[2px]
                  text-[8px]
                  sm:text-[9px]
                  md:text-xs
                  mb-1
                  sm:mb-2
                "
              >
                {banner.subtitle}
              </p>

              {/* Title */}
              <h1
                className="
                  text-base
                  sm:text-lg
                  md:text-2xl
                  lg:text-4xl
                  xl:text-5xl
                  font-semibold
                  leading-tight
                  mb-2
                  sm:mb-3
                  md:mb-4
                "
              >
                {banner.title}
              </h1>

              {/* Shop button */}
              <Button
                onClick={() => navigate(banner.route)}
                label="Shop Now"
                variant="secondary"
                className="
                  !ml-0
                  !px-3
                  !py-1
                  !text-[9px]
                  sm:!px-4
                  sm:!py-1.5
                  sm:!text-[10px]
                  md:!px-5
                  md:!py-2
                  md:!text-xs
                  min-w-[75px]
                  sm:min-w-[85px]
                  md:min-w-[105px]
                "
              />
            </div>
          </ImageCard>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
