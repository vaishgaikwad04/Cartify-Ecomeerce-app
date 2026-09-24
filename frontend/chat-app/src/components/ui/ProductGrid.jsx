import React from "react";
import Card from "../../../components/ui/Card";

const ProductGrid = ({
  products = [],
  isWishlisted,
  toggleWishlist,
}) => {
  return (
    <div
      className="
        w-full
        max-w-[1800px]
        mx-auto

        px-1.5
        sm:px-2
        md:px-4
        lg:px-6
        xl:px-8

        grid
        grid-cols-3
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-5
        2xl:grid-cols-6

        gap-1.5
        sm:gap-2
        md:gap-3
        lg:gap-4
        xl:gap-5
      "
    >
      {products.map((product) => (
        <Card
          key={product._id}
          product={product}
          isWishlisted={isWishlisted(product._id)}
          onToggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;