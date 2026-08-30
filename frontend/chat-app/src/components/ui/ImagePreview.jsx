import React, { useEffect, useState } from "react";

const ImagePreview = ({ Images = [] }) => {
  const [activeImage, setActiveImage] = useState("");

  // 🔥 IMPORTANT: sync when Images change
  useEffect(() => {
    if (Images.length > 0) {
      setActiveImage(Images[0]);
    }
  }, [Images]);

  if (!Images.length) return null;

  return (
    <div className="flex gap-4">

      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {Images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            onClick={() => setActiveImage(img)}
            className={`
              w-16 h-16 object-cover cursor-pointer rounded-md border
              transition-all duration-200
              ${activeImage === img ? "border-black scale-105" : "border-gray-200"}
              hover:scale-105
            `}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 overflow-hidden shadow-sm rounded-md">
        <img
          src={activeImage}
          alt="active preview"
          className="w-full h-[720px] object-cover transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default ImagePreview;