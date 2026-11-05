
import React, { useContext } from "react";

import Tabs from "../../../components/ui/Tab";
import ImagePreview from "../../../components/ui/ImagePreview";
import Recommendation from "../../user/productDescription/Recommendation";
import Button from "../../../components/ui/Button";

import { useDescription } from "../../../hooks/user/useDescription";
import CreateAndUpdateReview from "../review/CreateAndUpdateReview";
import Modal from "../../../components/ui/Modal";

import {
  FiTruck,
  FiRefreshCcw,
} from "react-icons/fi";

import {
  FiChevronRight,
} from "react-icons/fi";

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

  // ============================================================
  // THEME
  // ============================================================

  const mainText = isDark
    ? "text-[#F1EEE8]"
    : "text-[#292722]";

  const secondaryText = isDark
    ? "text-gray-400"
    : "text-[#858078]";

  const borderColor = isDark
    ? "border-white/10"
    : "border-[#EAE6DF]";

  const surface = isDark
    ? "bg-[#171717]"
    : "bg-[#FAF9F6]";

  // ============================================================
  // LOADING
  // ============================================================

  if (!product) {
    return (
      <div
        className={`
          flex items-center justify-center
          min-h-[55vh]
          text-[10px]
          uppercase
          tracking-[2px]
          ${secondaryText}
        `}
      >
        Loading product...
      </div>
    );
  }

  // ============================================================
  // RATING
  // ============================================================

  const averageRating = reviews.length
    ? (
        reviews.reduce(
          (sum, review) => sum + Number(review.rating || 0),
          0
        ) / reviews.length
      ).toFixed(1)
    : "0.0";

  return (
    <>
      <main
        className={`
          w-full
          max-w-[1800px]
          mx-auto
          px-3
          min-[380px]:px-3.5
          sm:px-5
          lg:px-8
          transition-colors duration-300
          ${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}
        `}
      >

        {/* =====================================================
            PRODUCT SECTION
        ===================================================== */}

        <section className="py-5 sm:py-7 lg:py-10">

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              items-start
              gap-5
              sm:gap-7
              lg:gap-12
              xl:gap-16
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

            <div
              className="
                w-full
                min-w-0
                lg:sticky
                lg:top-24
                lg:h-fit
              "
            >

              {/* BREADCRUMB */}

              <div
                className={`
                  flex items-center flex-wrap
                  gap-1
                  mb-3 sm:mb-4
                  text-[9px]
                  sm:text-[10px]
                  uppercase
                  tracking-[1px]
                  ${secondaryText}
                `}
              >
                <span
                  onClick={() => window.location.assign("/")}
                  className="cursor-pointer hover:opacity-70"
                >
                  Home
                </span>

                <FiChevronRight size={10} />

                <span className="break-words">
                  {product.category}
                </span>

                <FiChevronRight size={10} />

                <span
                  className={`
                    normal-case
                    tracking-normal
                    line-clamp-1
                    ${mainText}
                  `}
                >
                  {product.name}
                </span>
              </div>

              {/* PRODUCT NAME */}

              <h1
                className={`
                  text-[19px]
                  sm:text-[22px]
                  md:text-[25px]
                  lg:text-[27px]
                  font-medium
                  leading-tight
                  tracking-[-0.4px]
                  break-words
                  ${mainText}
                `}
              >
                {product.name}
              </h1>

              {/* PRICE */}

              <div
                className="
                  flex items-center flex-wrap
                  gap-2.5
                  mt-3
                  sm:mt-4
                "
              >
                {product.discountPrice && (
                  <span
                    className="
                      line-through
                      text-[11px]
                      sm:text-xs
                      text-gray-400
                    "
                  >
                    ₹{product.price}
                  </span>
                )}

                <span
                  className={`
                    text-lg
                    sm:text-xl
                    font-semibold
                    ${mainText}
                  `}
                >
                  ₹{finalPrice}
                </span>

                {product.discountPrice && (
                  <span
                    className={`
                      text-[9px]
                      uppercase
                      tracking-[1px]
                      ${isDark ? "text-[#D7C5AA]" : "text-[#8C6D45]"}
                    `}
                  >
                    Special Price
                  </span>
                )}
              </div>

              {/* SHIPPING / RETURNS */}

              <div
                className={`
                  mt-4
                  sm:mt-5
                  py-3
                  border-y
                  flex flex-wrap items-center
                  gap-x-4
                  gap-y-2
                  text-[10px]
                  sm:text-[11px]
                  ${borderColor}
                  ${secondaryText}
                `}
              >
                <span className="flex items-center gap-1.5">
                  <FiTruck size={14} />
                  Free shipping
                </span>

                <span
                  className={`
                    h-3
                    w-px
                    ${isDark ? "bg-white/10" : "bg-gray-200"}
                  `}
                />

                <span className="flex items-center gap-1.5">
                  <FiRefreshCcw size={14} />
                  Easy returns
                </span>
              </div>

              {/* SIZE */}

              {product.variants?.length > 0 && (
                <div className="mt-5 sm:mt-6">

                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className={`
                        text-[11px]
                        sm:text-xs
                        uppercase
                        tracking-[1.2px]
                        font-medium
                        ${mainText}
                      `}
                    >
                      Select Size
                    </h3>

                    <span
                      className={`
                        text-[9px]
                        sm:text-[10px]
                        ${secondaryText}
                      `}
                    >
                      {selectedSize
                        ? `Selected: ${selectedSize}`
                        : "Choose your size"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((item) => {
                      const isSelected =
                        selectedSize === item.size;

                      const isOutOfStock = item.stock <= 0;

                      return (
                        <button
                          key={item._id}
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(item.size)}
                          className={`
                            min-w-[43px]
                            sm:min-w-[48px]
                            h-9
                            px-3
                            rounded-md
                            border
                            text-[10px]
                            sm:text-[11px]
                            font-medium
                            transition-all duration-200

                            ${
                              isSelected
                                ? isDark
                                  ? "bg-[#D7C5AA] text-[#29251F] border-[#D7C5AA]"
                                  : "bg-[#292722] text-white border-[#292722]"
                                : isOutOfStock
                                  ? isDark
                                    ? "bg-gray-900 text-gray-600 border-gray-800 cursor-not-allowed"
                                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : isDark
                                    ? "border-gray-700 text-gray-300 hover:border-white"
                                    : "border-gray-300 text-gray-700 hover:border-black"
                            }
                          `}
                        >
                          {item.size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ACTION BUTTON */}

              <div className="mt-5 sm:mt-6">

                <button
                  type="button"
                  onClick={handleCart}
                  disabled={
                    selectedSize &&
                    selectedVariant?.stock <= 0
                  }
                  className={`
                    w-full
                    h-10
                    sm:h-11
                    rounded-md
                    text-[10px]
                    sm:text-[11px]
                    uppercase
                    tracking-[1.5px]
                    font-medium
                    transition-all duration-300

                    ${
                      selectedSize &&
                      selectedVariant?.stock <= 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : isDark
                          ? "bg-[#D7C5AA] text-[#29251F] hover:bg-[#C8B495]"
                          : "bg-[#292722] text-white hover:bg-[#444039]"
                    }
                  `}
                >
                  {selectedSize && selectedVariant?.stock <= 0
                    ? "Out Of Stock"
                    : "Add To Cart"}
                </button>
              </div>

              {/* =================================================
                  PRODUCT INFORMATION TABS
              ================================================= */}

              <div
                className={`
                  mt-6
                  sm:mt-7
                  border-y
                  ${borderColor}
                `}
              >
                <Tabs
                  tabs={[
                    {
                      id: "description",
                      label: "Description",
                      content: (
                        <p className="whitespace-pre-line">
                          {product.description ||
                            "No description available."}
                        </p>
                      ),
                    },
                    {
                      id: "details",
                      label: "Details",
                      content: product.details ? (
                        <ul className="list-disc pl-4 space-y-1.5">
                          {product.details
                            .split(".")
                            .filter((item) => item.trim())
                            .map((item, index) => (
                              <li key={index}>
                                {item.trim()}
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p>No details available.</p>
                      ),
                    },
                    {
                      id: "careFit",
                      label: "Care & Fit",
                      content: product.careFit ? (
                        <ul className="list-disc pl-4 space-y-1.5">
                          {product.careFit
                            .split(".")
                            .filter((item) => item.trim())
                            .map((item, index) => (
                              <li key={index}>
                                {item.trim()}
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p>No care instructions available.</p>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RECOMMENDATIONS
        ===================================================== */}

        <section className="pt-5 sm:pt-7">
          <Recommendation
            currentId={product._id}
            category={product.category}
          />
        </section>

        {/* =====================================================
            CUSTOMER REVIEWS
        ===================================================== */}

        <section
          className="
            w-full
            py-8
            sm:py-10
            lg:py-14
          "
        >

          {/* REVIEW HEADER */}

          <div
            className="
              flex items-center justify-between
              gap-2.5
              mb-5
              sm:mb-7
            "
          >
            <div className="min-w-0">
              <h2
                className={`
                  text-base
                  sm:text-lg
                  md:text-xl
                  font-medium
                  tracking-[-0.3px]
                  ${mainText}
                `}
              >
                Customer Reviews
              </h2>

              <p
                className={`
                  mt-1
                  text-[9px]
                  sm:text-[10px]
                  md:text-xs
                  ${secondaryText}
                `}
              >
                What customers say about this product
              </p>
            </div>

            <Button
              label="Write a Review"
              variant={isDark ? "secondary" : "primary"}
              onClick={() => setIsReviewModalOpen(true)}
              className="
                shrink-0
                whitespace-nowrap
                text-[9px]
                sm:text-[10px]
                px-2.5
                sm:px-4
              "
            />
          </div>

          {/* RATING SUMMARY */}

          <div
            className={`
              flex items-center justify-between
              gap-4
              px-4
              sm:px-5
              py-3.5
              sm:py-4
              mb-5
              sm:mb-6
              border
              rounded-lg
              ${surface}
              ${borderColor}
            `}
          >
            <div>
              <div className="flex items-baseline gap-1.5">
                <h3
                  className={`
                    text-2xl
                    sm:text-3xl
                    font-semibold
                    ${mainText}
                  `}
                >
                  {averageRating}
                </h3>

                <span
                  className={`text-[9px] ${secondaryText}`}
                >
                  / 5
                </span>
              </div>

              <p className="text-yellow-500 text-[11px] sm:text-xs mt-0.5">
                ★★★★★
              </p>
            </div>

            <div className="text-right">
              <p
                className={`
                  text-base
                  sm:text-lg
                  font-semibold
                  ${mainText}
                `}
              >
                {reviews.length}
              </p>

              <p
                className={`
                  text-[9px]
                  sm:text-[10px]
                  ${secondaryText}
                `}
              >
                Total Reviews
              </p>
            </div>
          </div>

          {/* REVIEW LIST */}

          <div className="space-y-3 sm:space-y-4">

            {reviews.length === 0 ? (
              <div
                className={`
                  py-10
                  sm:py-14
                  px-4
                  text-center
                  border
                  border-dashed
                  rounded-lg
                  ${borderColor}
                `}
              >
                <h3
                  className={`
                    text-sm
                    font-medium
                    ${mainText}
                  `}
                >
                  No reviews yet
                </h3>

                <p
                  className={`
                    mt-1.5
                    text-[10px]
                    sm:text-xs
                    ${secondaryText}
                  `}
                >
                  Be the first to share your experience.
                </p>
              </div>
            ) : (
              reviews.map((review) => {

                const reviewUserId = review.user?._id;

                const isOwner =
                  String(reviewUserId) === String(currentUserId);

                return (
                  <article
                    key={review._id}
                    className={`
                      p-3
                      sm:p-4
                      md:p-5
                      border
                      rounded-lg
                      ${surface}
                      ${borderColor}
                    `}
                  >

                    {/* REVIEW USER */}

                    <div
                      className="
                        flex items-start justify-between
                        gap-3
                      "
                    >

                      <div className="flex items-center gap-2.5 min-w-0">

                        {/* AVATAR */}

                        <div
                          className={`
                            w-8 h-8
                            sm:w-9 sm:h-9
                            shrink-0
                            rounded-full
                            flex items-center justify-center
                            text-[11px]
                            font-semibold
                            ${isDark
                              ? "bg-white/10 text-white"
                              : "bg-[#EEEAE2] text-[#292722]"
                            }
                          `}
                        >
                          {review.user?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <h4
                            className={`
                              text-[11px]
                              sm:text-xs
                              font-medium
                              truncate
                              ${mainText}
                            `}
                          >
                            {review.user?.name || "User"}
                          </h4>

                          <div
                            className="
                              mt-0.5
                              text-yellow-500
                              text-[10px]
                            "
                          >
                            {"★".repeat(
                              Math.min(5, Math.max(0, Number(review.rating) || 0))
                            )}
                            {"☆".repeat(
                              5 - Math.min(5, Math.max(0, Number(review.rating) || 0))
                            )}
                          </div>

                          <p
                            className={`
                              mt-0.5
                              text-[9px]
                              ${secondaryText}
                            `}
                          >
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* REVIEW ACTIONS */}

                      {isOwner && (
                        <div className="shrink-0">
                          <ActionMenu
                            row={review}
                            onEdit={handleUpdate}
                            onDelete={handleDelete}
                            showView={false}
                          />
                        </div>
                      )}
                    </div>

                    {/* REVIEW COMMENT */}

                    <p
                      className={`
                        mt-3
                        text-[10px]
                        sm:text-xs
                        leading-5
                        sm:leading-6
                        break-words
                        ${isDark ? "text-gray-300" : "text-[#68645D]"}
                      `}
                    >
                      {review.comment}
                    </p>
                  </article>
                );
              })
            )}
          </div>
        </section>

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
      </main>
    </>
  );
};

export default DescriptionPage;
