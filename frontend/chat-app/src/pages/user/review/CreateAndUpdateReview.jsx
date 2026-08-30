import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";

import { useCreateReview } from "../../../hooks/user/useCreateReview";

const CreateAndUpdateReview = ({ productId, onRefresh, onClose }) => {
  // REVIEW HOOK
  const { formData, handleChange, handleSubmit, isDark, loading } =
    useCreateReview({
      productId,
      onRefresh,
      onClose,
    });

  return (
    <div
      className={`
        w-full
        rounded-xl
        p-6

        transition-colors
        duration-300

        ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/*HEADER*/}
      <div
        className={`
          border-b
          pb-4
          mb-6

          ${isDark ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <h2 className="text-lg font-semibold">Write a Review</h2>

        <p
          className={`
            mt-1
            text-sm

            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          Share your experience with this product.
        </p>
      </div>

      {/*REVIEW FORM*/}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* RATING */}

        <InputField
          label="Rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          handleChange={handleChange}
          placeholder="Enter rating (1-5)"
        />

        {/* COMMENT */}

        <div>
          <label
            className={`
              block
              mb-2
              text-sm
              font-medium

              ${isDark ? "text-gray-200" : "text-gray-700"}
            `}
          >
            Comment
          </label>

          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Write your review..."
            className={`
              w-full
              h-32
              p-3

              rounded-lg
              border

              outline-none
              resize-none

              focus:ring-1

              ${
                isDark
                  ? `
                    bg-gray-800
                    text-white
                    border-gray-700
                    placeholder:text-gray-400
                    focus:ring-gray-500
                  `
                  : `
                    bg-white
                    text-black
                    border-gray-300
                    placeholder:text-gray-400
                    focus:ring-gray-400
                  `
              }
            `}
          />
        </div>

        {/* SUBMIT */}

        <Button
          type="submit"
          variant="secondary"
          label={loading ? "Submitting..." : "Submit Review"}
          className="w-full"
        />
      </form>
    </div>
  );
};

export default CreateAndUpdateReview;
