import React, { useContext } from "react";
import Tabs from "../../../components/ui/Tab";
import ImagePreview from "../../../components/ui/ImagePreview";
import Recommendation from "../../user/productDescription/Recommendation";
import Button from "../../../components/ui/Button";
import { useDescription } from "../../../hooks/user/useDescription";
import CreateAndUpdateReview from "../review/CreateAndUpdateReview";
import Modal from "../../../components/ui/Modal";
import { FiTruck, FiRefreshCcw } from "react-icons/fi";
import { AuthContext } from "../../../context/AuthContext";
import ActionMenu from "../../../components/ui/ActionMenu";

const DescriptionPage = () => {
  const {
    product,
    selectedSize,
    setSelectedSize,
    handleCart,
    finalPrice,
    selectedVariant,
    isDark,
    reviews,
    fetchReviews,
    isReviewModalOpen,
    setIsReviewModalOpen,
    selectedReview,
    handleDelete,
    handleUpdate,
  } = useDescription();

  const { user } = useContext(AuthContext);
  const currentUserId = user?._id || user?.id;

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-base text-gray-500">Loading product...</p>
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
          px-3
          sm:px-4
          md:px-6
          lg:px-8
          transition-colors
          duration-300
          ${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}
        `}
      >
        {/* =====================================================
            PRODUCT SECTION
        ===================================================== */}
        <div className="py-6 sm:py-8 lg:py-12">
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-8
              sm:gap-10
              lg:gap-20
              xl:gap-24
            "
          >
            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}
            <div className="w-full min-w-0">
              <ImagePreview Images={product?.images || []} />
            </div>

            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}
            <div className="w-full min-w-0 lg:sticky lg:top-24 lg:h-fit">
              {/* BREADCRUMB */}
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 mb-3 sm:mb-4 break-words">
                Home / {product.category} / {product.name}
              </p>

              {/* PRODUCT NAME */}
              <h1
                className={`
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  lg:text-2xl
                  font-semibold
                  leading-tight
                  break-words
                  ${isDark ? "text-white" : "text-gray-900"}
                `}
              >
                {product.name}
              </h1>

              {/* PRICE */}
              <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5">
                {product.discountPrice && (
                  <span className="line-through text-gray-400 text-xs sm:text-sm md:text-base">
                    ₹{product.price}
                  </span>
                )}

                <span
                  className={`
                    text-base
                    sm:text-lg
                    md:text-xl
                    font-bold
                    ${isDark ? "text-white" : "text-black"}
                  `}
                >
                  ₹{finalPrice}
                </span>
              </div>

              {/* SHIPPING / RETURNS */}
              <div
                className={`
                  mt-4
                  sm:mt-5
                  pt-4
                  sm:pt-5
                  border-t
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  text-[11px]
                  sm:text-xs
                  md:text-sm
                  ${
                    isDark
                      ? "border-gray-800 text-gray-400"
                      : "border-gray-200 text-gray-500"
                  }
                `}
              >
                <span className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <FiTruck className="text-sm sm:text-base shrink-0" />
                  Free shipping
                </span>

                <span
                  className={`
                    hidden
                    sm:block
                    h-4
                    w-px
                    ${isDark ? "bg-gray-800" : "bg-gray-200"}
                  `}
                />

                <span className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <FiRefreshCcw className="text-sm sm:text-base shrink-0" />
                  Easy returns
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-5 sm:mt-7 flex flex-col gap-2.5 sm:gap-3">
                <button
                  onClick={handleCart}
                  className={`
                    h-11
                    sm:h-12
                    md:h-13
                    w-full
                    rounded-lg
                    sm:rounded-xl
                    font-medium
                    text-xs
                    sm:text-sm
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

                <Button
                  label="Add To Wishlist"
                  variant={isDark ? "outlineDark" : "outline"}
                  className="w-full"
                />
              </div>

              {/* SIZE */}
              {product.variants?.length > 0 && (
                <div className="mt-6 sm:mt-7">
                  <h3
                    className={`
                      text-xs
                      sm:text-sm
                      md:text-base
                      font-medium
                      mb-3
                      sm:mb-4
                      ${isDark ? "text-white" : "text-gray-900"}
                    `}
                  >
                    Select Size
                  </h3>

                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {product.variants.map((item) => (
                      <button
                        key={item._id}
                        disabled={item.stock <= 0}
                        onClick={() => setSelectedSize(item.size)}
                        className={`
                          min-w-[52px]
                          sm:min-w-[60px]
                          md:min-w-[64px]

                          h-9
                          sm:h-10

                          px-3
                          sm:px-4

                          rounded-lg
                          border

                          font-medium

                          text-xs
                          sm:text-sm

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

              {/* PRODUCT DESCRIPTION */}
              <div
                className={`
    mt-6
    sm:mt-8
    rounded-xl
    sm:rounded-2xl
    p-4
    sm:p-5
    md:p-6
    border
    ${isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"}
  `}
              >
                {/* HEADER */}
                <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                  <h3
                    className={`
        text-sm
        sm:text-base
        font-semibold
        tracking-tight
        ${isDark ? "text-white" : "text-gray-900"}
      `}
                  >
                    Product Description
                  </h3>

                  {/* Small decorative line */}
                  <div
                    className={`
        h-px
        flex-1
        max-w-12
        ${isDark ? "bg-gray-700" : "bg-gray-200"}
      `}
                  />
                </div>

                {/* DESCRIPTION */}
                <p
                  className={`
      text-[11px]
      sm:text-xs
      md:text-sm
      leading-5
      sm:leading-6
      tracking-normal
      break-words
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

        {/* =====================================================
            TABS
        ===================================================== */}
        <div className="mt-8 sm:mt-10">
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

        {/* =====================================================
            RECOMMENDED PRODUCTS
        ===================================================== */}
        <Recommendation currentId={product._id} category={product.category} />

        {/* =====================================================
            REVIEWS
        ===================================================== */}
        <div className="w-full max-w-[1800px] mx-auto py-10 sm:py-12 lg:py-20">
          {/* REVIEW HEADER */}
          <div className="flex items-center justify-between gap-3 mb-7 sm:mb-10">
            {/* LEFT SIDE */}
            <div className="min-w-0">
              <h2
                className={`
        text-base
        sm:text-xl
        md:text-2xl
        font-semibold
        truncate
        ${isDark ? "text-white" : "text-gray-900"}
      `}
              >
                Customer Reviews
              </h2>

              <p
                className={`
        mt-1
        text-[10px]
        sm:text-xs
        md:text-sm
        truncate
        ${isDark ? "text-gray-400" : "text-gray-500"}
      `}
              >
                See what customers are saying about this product.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <Button
              label="Write a Review"
              variant={isDark ? "secondary" : "primary"}
              onClick={() => setIsReviewModalOpen(true)}
              className="
      shrink-0
      whitespace-nowrap
      text-[10px]
      sm:text-xs
      md:text-sm
      px-3
      sm:px-4
    "
            />
          </div>

          {/* RATING SUMMARY */}
          <div
            className={`
    border
    rounded-xl

    p-4
    sm:p-5
    md:p-6

    mb-7
    sm:mb-8

    flex
    items-center
    justify-between
    gap-4

    ${isDark ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"}
  `}
          >
            {/* RATING */}
            <div className="min-w-0">
              <h3
                className="
        text-xl
        sm:text-2xl
        md:text-3xl
        font-bold
      "
              >
                {reviews.length
                  ? (
                      reviews.reduce((sum, review) => sum + review.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : "0.0"}
              </h3>

              <p className="text-yellow-500 mt-1 text-xs sm:text-sm">★★★★★</p>
            </div>

            {/* TOTAL REVIEWS */}
            <div className="text-right shrink-0">
              <p className="text-sm sm:text-base md:text-lg font-semibold">
                {reviews.length}
              </p>

              <p
                className={`
        text-[10px]
        sm:text-xs
        md:text-sm
        ${isDark ? "text-gray-400" : "text-gray-500"}
      `}
              >
                Total Reviews
              </p>
            </div>
          </div>

          {/* REVIEW LIST */}
          <div className="max-h-[600px] overflow-x-hidden overflow-y-auto scrollbar-thin">
            {reviews.length === 0 ? (
              <div
                className={`
                  border
                  border-dashed
                  rounded-xl
                  sm:rounded-2xl
                  py-12
                  sm:py-16
                  px-4
                  text-center
                  ${isDark ? "border-gray-700" : "border-gray-300"}
                `}
              >
                <h3 className="text-sm sm:text-base font-medium">
                  No reviews yet
                </h3>

                <p
                  className={
                    isDark
                      ? "text-xs sm:text-sm text-gray-400 mt-2"
                      : "text-xs sm:text-sm text-gray-500 mt-2"
                  }
                >
                  Be the first to share your experience.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-5">
                {reviews.map((review) => {
                  const reviewUserId = review.user?._id;

                  const isOwner =
                    String(reviewUserId) === String(currentUserId);

                  return (
                    <div
                      key={review._id}
                      className={`
    border
    rounded-lg
    sm:rounded-xl

    p-3
    sm:p-4
    md:p-5
    lg:p-6

    ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
  `}
                    >
                      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-2.5 sm:gap-3 md:gap-4 min-w-0">
                          {/* USER AVATAR */}
                          <div
                            className={`
          flex
          h-8
          w-8
          sm:h-9
          sm:w-9
          md:h-10
          md:w-10
          lg:h-11
          lg:w-11

          shrink-0

          items-center
          justify-center

          rounded-full

          font-semibold

          text-xs
          sm:text-sm

          ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}
        `}
                          >
                            {review.user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div className="min-w-0">
                            {/* USER NAME */}
                            <h4
                              className={`
            text-xs
            sm:text-sm
            md:text-base

            font-semibold
            truncate

            ${isDark ? "text-white" : "text-gray-900"}
          `}
                            >
                              {review.user?.name || "User"}
                            </h4>

                            {/* RATING */}
                            <div
                              className="
            text-yellow-500
            text-[10px]
            sm:text-xs
            md:text-sm
            mt-0.5
            sm:mt-1
          "
                            >
                              {"★".repeat(review.rating)}
                              {"☆".repeat(5 - review.rating)}
                            </div>

                            {/* DATE */}
                            <p
                              className="
            text-[9px]
            sm:text-[10px]
            md:text-xs

            text-gray-400

            mt-0.5
            sm:mt-1
          "
                            >
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* ACTION MENU */}
                        <div
                          className="
        flex
        flex-col
        gap-3
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
                        >
                          {String(review.user?._id) ===
                            String(currentUserId) && (
                            <ActionMenu
                              row={review}
                              onEdit={handleUpdate}
                              onDelete={handleDelete}
                              showView={false}
                            />
                          )}
                        </div>
                      </div>

                      {/* REVIEW COMMENT */}
                      <p
                        className={`
      mt-2.5
      sm:mt-3
      md:mt-4

      text-[11px]
      sm:text-xs
      md:text-sm
      lg:text-base

      leading-5
      sm:leading-5
      md:leading-6

      break-words

      ${isDark ? "text-gray-300" : "text-gray-600"}
    `}
                      >
                        {review.comment}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            REVIEW MODAL
        ===================================================== */}
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
