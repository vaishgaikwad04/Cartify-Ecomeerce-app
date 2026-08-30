import React from "react";

const ImageCard = ({ image, children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer`}
    >
      <img
        src={image}
        alt=""
        className={`w-full object-cover transition duration-700 group-hover:scale-110 ${className}`}
      />

      <div className="absolute inset-0 bg-black/20" />

      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ImageCard;