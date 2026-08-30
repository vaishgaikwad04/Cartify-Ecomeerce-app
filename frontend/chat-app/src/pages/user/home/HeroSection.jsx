import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import ImageCard from "../../../components/ui/ImageCard";

//array of banners images
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
  ///navigate
  const navigate = useNavigate();

  return (
    //main container
    <section className="w-full max-w-[1800px] mx-auto px-4">
      {/*sub container*/}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {banners.map((banner, index) => (
          <ImageCard
            key={index}
            image={banner.image}
            className="
              h-[600px]
              sm:h-[700px]
              md:h-[800px]
              lg:h-[900px]
              xl:h-[1000px]
            "
          >
            <div
              className="
                absolute
                bottom-16
                sm:bottom-20
                md:bottom-28
                lg:bottom-40
                xl:bottom-80
                left-1/2
                -translate-x-1/2
                text-white
                z-10
                text-center
                w-[85%]
                sm:w-[70%]
                md:w-auto
              "
            >
              <p
                className="
                  uppercase
                  tracking-[3px]
                  sm:tracking-[4px]
                  text-xs
                  sm:text-sm
                  mb-2
                  sm:mb-3
                "
              >
                {banner.subtitle}
              </p>

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                  font-bold
                  mb-4
                  sm:mb-6
                "
              >
                {banner.title}
              </h1>

              <Button
                onClick={() => navigate(banner.route)}
                label="Shop Now"
                variant="secondary"
                className="w-1/2 !ml-22"
              />
            </div>
          </ImageCard>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
