// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../../components/ui/Button";
// import ImageCard from "../../../components/ui/ImageCard";

// // Array of banner images
// const banners = [
//   {
//     image:
//       "https://shopjonesandco.com/cdn/shop/files/jones-_-co-mini-dome-pony-cuff-gold-hair-accessory-mdpc01.jpg?v=1781662952&width=3000",
//     title: "Accessories",
//     subtitle: "Trending Style",
//     route: "/accessories",
//   },
//   {
//     image:
//       "https://mafoil.wpbingosite.com/wp-content/uploads/2023/02/banner-54-1.jpg",
//     title: "Clothing",
//     subtitle: "New Collection",
//     route: "/new-in-body",
//   },
// ];

// const HeroSection = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full max-w-[1700px] mx-auto px-2 sm:px-3 lg:px-5 lg:mt-2">
//       <div className="grid grid-cols-2">
//         {banners.map((banner, index) => (
//           <ImageCard
//             key={index}
//             image={banner.image}
//             className="aspect-[2/4] sm:aspect-[3/4] lg:aspect-[4/4]"
//           >
//             <div
//               className="
//   absolute
//   inset-x-0
//   bottom-34
//   sm:bottom-56
//   md:bottom-34
//   lg:bottom-44
//   2v z-10
//   flex
//   flex-col
//   items-center
//   text-center
//   text-white
//   px-2
// "
//             >
//               <p
//                 className="
//               uppercase
//               tracking-[1px]
//               sm:tracking-[1.5px]
//               md:tracking-[2px]
//               text-[8px]
//               sm:text-[9px]
//               md:text-xs
//               lg:text-xs

//               mb-1
//               sm:mb-2
//             "
//               >
//                 {banner.subtitle}
//               </p>

//               <h1
//                 className="
//               text-base
//               sm:text-lg
//               md:text-2xl
//               lg:text-2xl
//               xl:text-4xl
//               font-semibold
//               leading-tight
//               mb-2
//               sm:mb-3
//               md:mb-4
//             "
//               >
//                 {banner.title}
//               </h1>

//               <Button
//                 onClick={() => navigate(banner.route)}
//                 label="Shop Now"
//                 variant="secondary"
//                 className="
//               !ml-0
//               !px-3
//               !py-1
//               !text-[9px]
//               sm:!px-4
//               sm:!py-1.5
//               sm:!text-[10px]
//               md:!px-5
//               md:!py-2
//               md:!text-xs
//               min-w-[75px]
//               sm:min-w-[85px]
//               md:min-w-[105px]
//             "
//               />
//             </div>
//           </ImageCard>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import ImageCard from "../../../components/ui/ImageCard";

const banners = [
  {
    image:
      "https://shopjonesandco.com/cdn/shop/files/jones-_-co-mini-dome-pony-cuff-gold-hair-accessory-mdpc01.jpg?v=1781662952&width=3000",
    title: "Accessories",
    subtitle: "Trending Style",
    route: "/accessories",
  },
  {
    image:
      "https://mafoil.wpbingosite.com/wp-content/uploads/2023/02/banner-54-1.jpg",
    title: "Clothing",
    subtitle: "New Collection",
    route: "/new-in-body",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 lg:px-5 mt-2">
      <div className="grid grid-cols-2">
        {banners.map((banner, index) => (
          <ImageCard
            key={index}
            image={banner.image}
            className="
              group
              relative
              overflow-hidden
              w-full
              aspect-[2/4]
              sm:aspect-[3/4]
              lg:aspect-[4/4]
              rounded-sm
            "
          >
            {/* Image overlay */}
            <div
              className="
                absolute inset-0
                z-[1]
                bg-gradient-to-t
                from-black/45
                via-black/5
                to-black/10
                pointer-events-none
              "
            />

            {/* Banner content */}
            <div
              className="
                absolute
                inset-x-0
                bottom-8
                sm:bottom-12
                md:bottom-14
                lg:bottom-56
                z-10
                flex
                flex-col
                items-center
                justify-center
                text-center
                text-white
                px-2
              "
            >
              {/* Subtitle */}
              <p
                className="
                  uppercase
                  tracking-[1.5px]
                  sm:tracking-[2px]
                  text-[8px]
                  sm:text-[10px]
                  md:text-xs
                  font-medium
                  mb-2
                  sm:mb-3
                  opacity-90
                "
              >
                {banner.subtitle}
              </p>

              {/* Title */}
              <h1
                className="
                  text-lg
                  sm:text-2xl
                  md:text-3xl
                  lg:text-4xl
                  font-medium
                  tracking-wide
                  leading-tight
                  mb-3
                  sm:mb-5
                "
              >
                {banner.title}
              </h1>

              {/* Shop Now Button */}
              <button
                type="button"
                onClick={() => navigate(banner.route)}
                className="
                  group/btn
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-white
                  text-gray-900
                  rounded-sm
                  px-3
                  py-2
                  sm:px-5
                  sm:py-2.5
                  text-[9px]
                  sm:text-xs
                  font-medium
                  tracking-wide
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-gray-900
                  hover:text-white
                "
              >
                Shop Now
                <FiArrowUpRight
                  className="
                    text-sm
                    sm:text-base
                    transition-transform
                    duration-300
                    group-hover/btn:translate-x-0.5
                    group-hover/btn:-translate-y-0.5
                  "
                />
              </button>
            </div>
          </ImageCard>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
