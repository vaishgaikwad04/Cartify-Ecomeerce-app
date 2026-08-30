import React from "react";
//resuable components
import Card from "../../../components/ui/Card";
///brand hook
import { useBrand } from "../../../hooks/user/useBrand";
import { useParams } from "react-router-dom";

const BrandPage = () => {
  // URL PARAMETER
  const { brand } = useParams();

  // DECODE BRAND NAME
  const decodedBrand = brand ? decodeURIComponent(brand) : "";

  // BRAND HOOK
  const { products, loading, isDark } = useBrand(decodedBrand);

  return (
    //main container
    <div
      className={`
        max-w-[1800px]
        mx-auto
        px-4
        sm:px-6
        lg:px-10
        py-10
        transition-colors
        duration-300

        ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >
      {/*sub cotainer*/}
      <div className="mb-8">
        {/*heading*/}
        <h1
          className={`
            text-2xl
            sm:text-3xl
            font-bold

            ${isDark ? "text-white" : "text-gray-900"}
          `}
        >
          {decodedBrand} Products
        </h1>

        {/*para*/}
        <p
          className={`
            text-sm
            mt-1

            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          Explore curated products from {decodedBrand}
        </p>
      </div>

      {/*LOADING STATE*/}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`
                h-72
                animate-pulse
                rounded-xl

                ${isDark ? "bg-gray-800" : "bg-gray-100"}
              `}
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        /* EMPTY STATE*/
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2
            className={`
              text-xl
              font-semibold

              ${isDark ? "text-white" : "text-gray-800"}
            `}
          >
            No products found
          </h2>

          <p
            className={`
              mt-2

              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Try selecting another brand
          </p>
        </div>
      ) : (
        /*PRODUCTS*/
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="
                transform
                hover:-translate-y-1
                transition
                duration-200
              "
            >
              <Card product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;
