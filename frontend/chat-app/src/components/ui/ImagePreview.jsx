// import React, { useEffect, useState } from "react";

// const ImagePreview = ({ Images = [] }) => {
//   const [activeImage, setActiveImage] = useState("");

//   // Sync active image when product images change
//   useEffect(() => {
//     if (Images.length > 0) {
//       setActiveImage(Images[0]);
//     }
//   }, [Images]);

//   if (!Images.length) return null;

//   return (
//     <div className="flex gap-3 sm:gap-4 w-full">

//       {/* Thumbnails */}
//       <div className="flex flex-col gap-2 shrink-0">
//         {Images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`thumb-${index}`}
//             onClick={() => setActiveImage(img)}
//             className={`
//               w-12 h-16
//               sm:w-14 sm:h-18
//               md:w-16 md:h-20
//               object-cover
//               cursor-pointer
//               rounded-md
//               border
//               transition-all
//               duration-200

//               ${activeImage === img
//                 ? "border-black scale-105"
//                 : "border-gray-200"
//               }

//               hover:scale-105
//             `}
//           />
//         ))}
//       </div>

//       {/* Main Image */}
//       <div className="flex-1 min-w-0 aspect-[4/4] overflow-hidden rounded-md shadow-sm">
//         <img
//           src={activeImage}
//           alt="active preview"
//           className="
//             w-full
//             h-full
//             object-cover
//             transition-transform
//             duration-300
//           "
//         />
//       </div>

//     </div>
//   );
// };

// export default ImagePreview;

import React, { useEffect, useState } from "react";

const ImagePreview = ({ Images = [] }) => {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    setActiveImage(Images?.[0] || "");
  }, [Images]);

  if (!Images?.length) return null;

  return (
    <div className="flex w-full min-w-0 items-start gap-2 sm:gap-3">
      {/* Thumbnails */}
      {Images.length > 1 && (
        <div
          className="
            flex shrink-0 flex-col gap-2
            max-h-[420px] overflow-y-auto
            scrollbar-thin
          "
        >
          {Images.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setActiveImage(img)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={activeImage === img}
              className={`
                h-12 w-10 sm:h-16 sm:w-12
                md:h-20 md:w-14
                shrink-0 overflow-hidden rounded-md border
                transition-colors duration-200
                ${
                  activeImage === img
                    ? "border-black ring-1 ring-black"
                    : "border-gray-200 hover:border-gray-400"
                }
              `}
            >
              <img
                src={img}
                alt={`Product thumbnail ${index + 1}`}
                className="block h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div
        className="
          relative min-w-0 flex-1
          aspect-[4/5]
          overflow-hidden rounded-md
          bg-gray-50
        "
      >
        <img
          src={activeImage}
          alt="Product preview"
          className="
            absolute inset-0 block
            h-full w-full
            object-contain
            transition-opacity duration-200
          "
        />
      </div>
    </div>
  );
};

export default ImagePreview;
