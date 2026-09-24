import React, { useEffect, useState } from "react";

const ImagePreview = ({ Images = [] }) => {
  const [activeImage, setActiveImage] = useState("");

  // Sync active image when product images change
  useEffect(() => {
    if (Images.length > 0) {
      setActiveImage(Images[0]);
    }
  }, [Images]);

  if (!Images.length) return null;

  return (
    <div className="flex gap-3 sm:gap-4 w-full">

      {/* Thumbnails */}
      <div className="flex flex-col gap-2 shrink-0">
        {Images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            onClick={() => setActiveImage(img)}
            className={`
              w-12 h-16
              sm:w-14 sm:h-18
              md:w-16 md:h-20
              object-cover
              cursor-pointer
              rounded-md
              border
              transition-all
              duration-200

              ${activeImage === img
                ? "border-black scale-105"
                : "border-gray-200"
              }

              hover:scale-105
            `}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 min-w-0 aspect-[3/4] overflow-hidden rounded-md shadow-sm">
        <img
          src={activeImage}
          alt="active preview"
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-300
          "
        />
      </div>

    </div>
  );
};

export default ImagePreview;