// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../../components/ui/Button";
// import ImageCard from "../../../components/ui/ImageCard";

// // Array of banner images
// const banners = [
//   {
//     image:
//       "https://mafoil.wpbingosite.com/wp-content/uploads/2023/02/banner-54-1.jpg",
//     title: "Clothing",
//     subtitle: "New Collection",
//     route: "/new-in-body",
//   },
//   {
//     image:
//       "https://shopjonesandco.com/cdn/shop/files/jones-_-co-mini-dome-pony-cuff-gold-hair-accessory-mdpc01.jpg?v=1781662952&width=3000",
//     title: "Accessories",
//     subtitle: "Trending Style",
//     route: "/accessories",
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
//             className="aspect-[3/4] sm:aspect-[3/4] lg:aspect-[4/4]"
//           >
//             <div
//           className="
//   absolute
//   inset-x-0
//   bottom-12
//   sm:bottom-48
//   md:bottom-20
//   lg:bottom-52
//   z-10
//   flex
//   flex-col
//   items-center
//   text-center
//   text-white
//   px-2
// ">
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
import Button from "../../../components/ui/Button";
import ImageCard from "../../../components/ui/ImageCard";

const banners = [
  {
    image:
      "https://mafoil.wpbingosite.com/wp-content/uploads/2023/02/banner-54-1.jpg",
    title: "Clothing",
    subtitle: "New Collection",
    route: "/new-in-body",
  },
  {
    image:
      "https://shopjonesandco.com/cdn/shop/files/jones-_-co-mini-dome-pony-cuff-gold-hair-accessory-mdpc01.jpg?v=1781662952&width=3000",
    title: "Accessories",
    subtitle: "Trending Style",
    route: "/accessories",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto w-full max-w-[1700px] px-2 pt-2 sm:px-3 lg:px-5 lg:pt-2">
     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
        {banners.map((banner) => (
          <ImageCard
            key={banner.title}
            image={banner.image}
            className="
              aspect-[3/4]
              overflow-hidden
              rounded-lg
              sm:aspect-[4/5]
              lg:aspect-[4/4]
            "
          >
            <div
              className="
                absolute inset-x-0 bottom-4 z-10
                flex flex-col items-center
                px-2 text-center text-white
                sm:bottom-8 sm:px-3
                md:bottom-12
                lg:bottom-20
                xl:bottom-24
              "
            >
              <p
                className="
                  mb-1 text-[9px] font-medium uppercase
                  leading-tight tracking-[1.2px]
                  drop-shadow-md
                  sm:mb-1.5 sm:text-[10px] sm:tracking-[1.8px]
                  md:text-xs
                "
              >
                {banner.subtitle}
              </p>

              <h2
                className="
                  mb-2 text-lg font-semibold leading-tight
                  tracking-tight drop-shadow-md
                  min-[400px]:text-xl
                  sm:mb-3 sm:text-2xl
                  md:text-3xl
                  xl:text-4xl
                "
              >
                {banner.title}
              </h2>

              <Button
                onClick={() => navigate(banner.route)}
                label="Shop Now"
                variant="secondary"
                className="
                  !ml-0 !min-h-[36px] !min-w-[90px]
                  !rounded-full !px-3 !py-2
                  !text-[11px] !font-medium
                  sm:!min-h-[40px] sm:!min-w-[105px]
                  sm:!px-4 sm:!text-xs
                  md:!min-w-[115px]
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
