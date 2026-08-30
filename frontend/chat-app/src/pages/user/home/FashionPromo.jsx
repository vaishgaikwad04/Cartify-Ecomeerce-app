///reusable components
import ImageCard from "../../../components/ui/ImageCard";
import Card from "../../../components/ui/Card";

//fashionPromo custom hook
import { useFashionPromo } from "../../../hooks/user/useFashionPromo";
//wishlist custom hook
import { useWishlist } from "../../../hooks/user/useWishList";

// FASHION PROMO IMAGES
const images = [
  "https://mafoil.wpbingosite.com/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/lookbook-2.jpg",
  "https://mafoil.wpbingosite.com/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/lookbook-1.jpg",
];

const FashionPromo = () => {

  // FASHION PROMO HOOK
  const {
    openProductModel,
    setOpenProductModel,
    isDark,
    products,
  } = useFashionPromo();


  // WISHLIST
  const {
    isWishlisted,
    toggleWishlist,
  } = useWishlist();

  return (
    //main container
    <div
      className={`
        max-w-[1800px]
        mx-auto
        px-4
        sm:px-6
        lg:px-10
        py-12
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6

        transition-colors
        duration-300

        ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >
      {/*PROMO IMAGES*/}
      {images.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          className="
            h-[500px]
            sm:h-[600px]
            lg:h-[720px]
            rounded
          "
        >
          <div className="relative z-50">
            {/*PLUS BUTTON*/}
            <button
              type="button"
              onClick={() =>
                setOpenProductModel(index)
              }
              aria-label={`View product ${index + 1}`}
              className={`
                w-10
                h-10
                rounded-full

                flex
                items-center
                justify-center

                shadow-md
                text-xl

                transition-all
                duration-200

                ${
                  isDark
                    ? `
                      bg-gray-900
                      text-white
                      hover:bg-gray-800
                    `
                    : `
                      bg-white
                      text-black
                      hover:bg-gray-100
                    `
                }
              `}
            >
              +
            </button>

            {/* PRODUCT POPUP */}
            {openProductModel === index &&
              products?.length > 0 && (
                <div
                  className="
                    absolute
                    top-12
                    left-0
                    z-[9999]
                    w-[192px]
                    sm:w-[272px]
                    max-w-[calc(100vw-2rem)]
                  "
                >
                  <div
                    className={`
                      relative
                      w-full
                      rounded-xl
                      shadow-xl
                      p-3
                      overflow-hidden
                      ${
                        isDark
                          ? "bg-gray-900"
                          : "bg-white"
                      }
                    `}
                  >
                    {/* CLOSE BUTTON*/}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenProductModel(null)
                      }
                      aria-label="Close product popup"
                      className={`
                        absolute
                        top-2
                        right-3
                        z-[10000]
                        w-7
                        h-7
                        flex
                        items-center
                        justify-center
                        rounded-full
                        text-lg
                        transition-colors
                        ${
                          isDark
                            ? `
                              text-gray-300
                              hover:bg-gray-800
                              hover:text-white
                            `
                            : `
                              text-gray-500
                              hover:bg-gray-100
                              hover:text-black
                           `
                        }
                      `}
                    >
                      ×
                    </button>

                    {/*   PRODUCT CARD */}
                    <Card
                      product={products[0]}
                      isWishlisted={isWishlisted(
                        products[0]._id
                      )}
                      onToggleWishlist={
                        toggleWishlist
                      }
                    />
                  </div>
                </div>
              )}
          </div>
        </ImageCard>
      ))}
    </div>
  );
};

export default FashionPromo;