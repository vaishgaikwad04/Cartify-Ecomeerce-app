import React from "react";
import Tabs from "../../../components/ui/Tab";
import ImagePreview from "../../../components/ui/ImagePreview";
import Recommendation from "../../user/productDescription/Recommendation";
import Button from "../../../components/ui/Button";
import { useDescription } from "../../../hooks/user/useDescription";
import CreateAndUpdateReview from "../review/CreateAndUpdateReview";
import Modal from "../../../components/ui/Modal";

const DescriptionPage = () => {
  const {
    product,
    selectedSize,
    setSelectedSize,
    handleCart,
    finalPrice,
    selectedVariant,

    isDark,
    currentUserId,

    reviews,
    fetchReviews,

    isReviewModalOpen,
    setIsReviewModalOpen,

    selectedReview,
    handleDelete,
    handleUpdate,
  } = useDescription();

  // Show loading state until product data is available
  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`
          w-full
          max-w-[1800px]
          mx-auto
          px-4
          transition-colors
          duration-300
          ${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}
        `}
      >
        {/* PRODUCT SECTION */}

        <div className="py-8 sm:py-10 lg:py-12">
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-10
              sm:gap-12
              lg:gap-24
            "
          >
            {/* PRODUCT IMAGE */}

            <ImagePreview Images={product?.images || []} />

            {/* PRODUCT DETAILS */}

            <div className="lg:sticky lg:top-24 lg:h-fit">
              {/* BREADCRUMB */}

              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                Home / {product.category} / {product.name}
              </p>

              {/* PRODUCT NAME */}

              <h1
                className={`
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-semibold
                  leading-tight
                  ${isDark ? "text-white" : "text-gray-900"}
                `}
              >
                {product.name}
              </h1>

              {/* PRICE */}

              <div
                className="
                  flex
                  items-center
                  flex-wrap
                  gap-3
                  sm:gap-4
                  mt-5
                  sm:mt-6
                "
              >
                {/* ORIGINAL PRICE */}

                {product.discountPrice && (
                  <span className="line-through text-gray-400 text-sm sm:text-base">
                    ₹{product.price}
                  </span>
                )}

                {/* FINAL PRICE */}

                <span
                  className={`
                    text-lg
                    sm:text-xl
                    font-bold
                    ${isDark ? "text-white" : "text-black"}
                  `}
                >
                  ₹{finalPrice}
                </span>
              </div>

              {/* SIZE */}

              {product.variants?.length > 0 && (
                <div className="mt-7 sm:mt-8">
                  <h3
                    className={`
                      font-medium
                      mb-4
                      ${isDark ? "text-white" : "text-gray-900"}
                    `}
                  >
                    Select Size
                  </h3>

                  {/* SIZE BUTTONS */}

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.variants.map((item) => (
                      <button
                        key={item._id}
                        disabled={item.stock <= 0}
                        onClick={() => setSelectedSize(item.size)}
                        className={`
                          min-w-[64px]
                          sm:min-w-[70px]
                          h-10
                          sm:h-11
                          px-3
                          sm:px-4
                          rounded-lg
                          border
                          font-medium
                          text-sm
                          sm:text-base
                          transition-all
                          duration-200

                          ${
                            selectedSize === item.size
                              ? isDark
                                ? "bg-white text-black border-white shadow-md"
                                : "bg-black text-white border-black shadow-sm"
                              : item.stock <= 0
                                ? isDark
                                  ? "bg-gray-900 text-gray-600 border-gray-800 cursor-not-allowed"
                                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : isDark
                                  ? "bg-gray-950 text-white border-gray-700 hover:border-white hover:bg-gray-900"
                                  : "bg-white text-gray-900 border-gray-300 hover:border-black"
                          }
                        `}
                      >
                        {item.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}

              <div className="mt-7 sm:mt-8 flex flex-col gap-3">
                {/* ADD TO CART */}

                <button
                  onClick={handleCart}
                  className={`
                    h-12
                    sm:h-14
                    w-full
                    rounded-xl
                    font-medium
                    transition-all
                    duration-300

                    ${
                      isDark
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                    }
                  `}
                >
                  {selectedSize && selectedVariant?.stock <= 0
                    ? "Out Of Stock"
                    : "Add To Cart"}
                </button>

                {/* WISHLIST */}

                <Button label="Add To Wishlist" variant="outlineDark" />
              </div>

              {/* PRODUCT DESCRIPTION */}

              <div
                className={`
                  mt-7
                  sm:mt-8
                  rounded-2xl
                  p-4
                  sm:p-6
                  ${isDark ? "bg-gray-900" : "bg-gray-50"}
                `}
              >
                <h3
                  className={`
                    font-semibold
                    mb-3
                    ${isDark ? "text-white" : "text-gray-900"}
                  `}
                >
                  Product Description
                </h3>

                <p
                  className={`
                    text-sm
                    sm:text-base
                    leading-7
                    sm:leading-8
                    tracking-wide
                    transition-colors
                    duration-300
                    ${isDark ? "text-gray-300" : "text-gray-600"}
                  `}
                >
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}

        <div className="mt-10">
          <Tabs
            tabs={[
              {
                id: "description",
                label: "Description",
                content: (
                  <p>{product.description || "No description available"}</p>
                ),
              },

              {
                id: "details",
                label: "Details",
                content: product.details ? (
                  <ul className="list-disc pl-5">
                    {product.details
                      .split(".")
                      .filter((item) => item.trim())
                      .map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                  </ul>
                ) : (
                  <p>No details available</p>
                ),
              },

              {
                id: "careFit",
                label: "Care Fit",
                content: product.careFit ? (
                  <ul className="list-disc pl-5">
                    {product.careFit
                      .split(".")
                      .filter((item) => item.trim())
                      .map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                  </ul>
                ) : (
                  <p>No care fit available</p>
                ),
              },
            ]}
          />
        </div>

        {/* RECOMMENDED PRODUCTS */}

        <Recommendation currentId={product._id} category={product.category} />

        {/* REVIEWS */}

        <div className="w-full max-w-[1800px] mx-auto py-12 sm:py-16 lg:py-24">
          {/* REVIEW HEADER */}

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              mb-8
              sm:mb-10
            "
          >
            <div>
              <h2
                className={`
                  text-2xl
                  sm:text-3xl
                  font-semibold
                  ${isDark ? "text-white" : "text-gray-900"}
                `}
              >
                Customer Reviews
              </h2>

              <p
                className={`
                  mt-2
                  text-sm
                  sm:text-base
                  ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
              >
                See what customers are saying about this product.
              </p>
            </div>

            <Button
              label="Write a Review"
              variant="secondary"
              onClick={() => setIsReviewModalOpen(true)}
              className="w-full sm:w-auto"
            />
          </div>

          {/* RATING SUMMARY */}

          <div
            className={`
              border
              rounded-xl
              p-5
              sm:p-8
              mb-8

              flex
              flex-col
              gap-6

              sm:flex-row
              sm:items-center
              sm:justify-between

              ${
                isDark
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >
            {/* AVERAGE RATING */}

            <div>
              <h3 className="text-3xl sm:text-4xl font-bold">
                {reviews.length
                  ? (
                      reviews.reduce((sum, review) => sum + review.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : "0.0"}
              </h3>

              <p className="text-yellow-500 mt-2 text-sm sm:text-base">★★★★★</p>
            </div>

            {/* TOTAL REVIEWS */}

            <div className="sm:text-right">
              <p className="text-lg sm:text-xl font-semibold">
                {reviews.length}
              </p>

              <p
                className={
                  isDark
                    ? "text-sm sm:text-base text-gray-400"
                    : "text-sm sm:text-base text-gray-500"
                }
              >
                Total Reviews
              </p>
            </div>
          </div>

          {/* REVIEW LIST */}

          <div className="max-h-[600px] overflow-x-hidden overflow-y-auto scrollbar-thin">
            {reviews.length === 0 ? (
              /* NO REVIEWS */

              <div
                className={`
                  border
                  border-dashed
                  rounded-2xl
                  sm:rounded-3xl
                  py-16
                  sm:py-20
                  px-4
                  text-center
                  ${isDark ? "border-gray-700" : "border-gray-300"}
                `}
              >
                <h3 className="font-medium">No reviews yet</h3>

                <p
                  className={
                    isDark
                      ? "text-sm sm:text-base text-gray-400 mt-2"
                      : "text-sm sm:text-base text-gray-500 mt-2"
                  }
                >
                  Be the first to share your experience.
                </p>
              </div>
            ) : (
              /* REVIEWS */

              <div className="space-y-4 sm:space-y-5">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className={`
                      border
                      rounded-xl
                      p-4
                      sm:p-6

                      ${
                        isDark
                          ? "bg-gray-900 border-gray-700"
                          : "bg-white border-gray-200"
                      }
                    `}
                  >
                    {/* REVIEW TOP */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                      "
                    >
                      {/* USER INFO */}

                      <div className="flex gap-3 sm:gap-4 min-w-0">
                        {/* AVATAR */}

                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            sm:h-12
                            sm:w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            font-semibold

                            ${
                              isDark
                                ? "bg-gray-800 text-white"
                                : "bg-gray-100 text-gray-900"
                            }
                          `}
                        >
                          {review.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        {/* USER DETAILS */}

                        <div className="min-w-0">
                          <h4
                            className={`
                              font-semibold
                              truncate
                              ${isDark ? "text-white" : "text-gray-900"}
                            `}
                          >
                            {review.user?.name}
                          </h4>

                          {/* RATING */}

                          <div className="text-yellow-500 text-sm mt-1">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>

                          {/* DATE */}

                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* EDIT / DELETE */}

                      {review.user?._id === currentUserId && (
                        <div className="flex items-center gap-4 sm:gap-3">
                          <button
                            onClick={() => handleUpdate(review._id)}
                            className="
                              text-sm
                              text-blue-600
                              hover:text-blue-700
                              transition-colors
                            "
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(review._id)}
                            className="
                              text-sm
                              text-red-600
                              hover:text-red-700
                              transition-colors
                            "
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    {/* REVIEW COMMENT */}

                    <p
                      className={`
                        mt-4
                        text-sm
                        sm:text-base
                        leading-relaxed
                        break-words
                        ${isDark ? "text-gray-300" : "text-gray-600"}
                      `}
                    >
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* REVIEW MODAL */}

        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        >
          <CreateAndUpdateReview
            productId={product._id}
            reviewData={selectedReview}
            onRefresh={() => fetchReviews(product._id)}
            onClose={() => setIsReviewModalOpen(false)}
          />
        </Modal>
      </div>
    </>
  );
};

export default DescriptionPage;
