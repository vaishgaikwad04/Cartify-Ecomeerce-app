import Button from "../../../components/ui/Button";
import ImageCard from "../../../components/ui/ImageCard";
import TextCard from "../../../components/ui/TextCard";
import Card from "../../../components/ui/Card";

///hooks
import { useSale } from "../../../hooks/user/useSale";
import { useWishlist } from "../../../hooks/user/useWishList";

const Sale = () => {
  //sale custom hook
  const { isDark, navigate, categories } = useSale();
  //wishlist custom hook
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <section
      className={`
      max-w-[1800px]
      mx-auto
      px-6
      py-20
      transition-colors duration-300

      ${isDark ? "bg-gray-950" : "bg-white"}
      `}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8">
          <ImageCard
            image="https://mafoil.wpbingosite.com/wp-content/uploads/2022/11/banner-21.jpg"
            className="h-[400px]"
            onClick={() => navigate("/body")}
          />
          <div className="grid grid-cols-2 gap-8">
            <ImageCard
              image="https://mafoil.wpbingosite.com/wp-content/uploads/2022/11/banner-22.jpg"
              className="h-[300px]"
              onClick={() => navigate("/accessories")}
            />
            <TextCard
              subtitle="Limited Offer"
              title="Summer Sale"
              description="Up to 50% off on selected items"
              className={`
              
              ${isDark ? "bg-gray-900 text-white" : "bg-[#f8f6f6]"}
              `}
            >
              <Button label="Shop Now" variant="primary" />
            </TextCard>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid sm:grid-cols-2 gap-4">
          {categories?.length > 0 ? (
            categories.slice(0, 4).map((product) => (
              <div key={product._id}>
                <Card
                  product={product}
                  isWishlisted={isWishlisted(product._id)}
                  onToggleWishlist={toggleWishlist}
                />
              </div>
            ))
          ) : (
            <p
              className={`
                ml-64 mt-46

                ${isDark ? "text-gray-300" : "text-gray-700"}

                `}
            >
              No categories found
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sale;
