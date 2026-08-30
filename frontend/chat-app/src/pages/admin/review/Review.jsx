import Table from "../../../components/ui/Table";
import SearchBar from "../../../components/ui/SearchBar";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import Dropdown from "../../../components/ui/Dropdown";
import { useReviews } from "../../../hooks/admin/reviews/useReviews";

const Review = () => {
  const {
    // Reviews data
    reviewsData,
    filteredReviews,

    // Search
    search,
    setSearch,

    // Rating filter
    ratingFilter,
    setRatingFilter,

    // Theme
    isDark,
  } = useReviews();
  const reviewsColumns = [
    {
      key: "Customer",
      label: "Customer",
      render: (review) => {
        const userName =
          review?.user?.name.charAt(0).toUpperCase() +
            review?.user?.name.slice(1) || "Unknown User";
        const firstLetter = userName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-[180px]">
            {/* Avatar */}
            <div
              className={`
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg border text-sm font-semibold uppercase
              ${
                isDark
                  ? "border-gray-400 bg-gray-200 text-gray-800"
                  : "border-gray-200 bg-gray-100 text-gray-700"
              }
            `}
            >
              {firstLetter}
            </div>

            {/* User */}
            <div className="min-w-0">
              <p
                className={`
                max-w-[150px] truncate text-sm font-medium
                ${isDark ? "text-gray-200" : "text-gray-800"}
              `}
                title={userName}
              >
                {userName}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      key: "Product ",
      label: "Product",
      render: (review) => {
        const productName =
          review?.product?.name.charAt(0).toUpperCase() +
            review?.product?.name.slice(1) || "Unknown Product";

        return (
          <p
            className={`
            max-w-[180px] truncate text-sm font-medium
            ${isDark ? "text-gray-200" : "text-gray-800"}
          `}
            title={productName}
          >
            {productName}
          </p>
        );
      },
    },

    {
      key: "Rating",
      label: "rating",
      render: (review) => {
        const rating = Number(review?.rating) || 0;

        return (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={
                    index < rating
                      ? "text-yellow-500"
                      : isDark
                        ? "text-gray-600"
                        : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <span
              className={`
              text-xs font-medium
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
            >
              {rating}/5
            </span>
          </div>
        );
      },
    },

    {
      key: "Comment",
      label: "comment",
      render: (review) => {
        const comment = review?.comment
          ? review.comment.charAt(0).toUpperCase() + review.comment.slice(1)
          : "No comment";

        return (
          <p
            className={`
            max-w-[260px] truncate text-sm
            ${isDark ? "text-gray-300" : "text-gray-600"}
          `}
            title={comment}
          >
            {comment}
          </p>
        );
      },
    },

    {
      key: "Date",
      label: "createdAt",
      render: (review) => {
        if (!review?.createdAt) return "-";

        return (
          <span
            className={`
            whitespace-nowrap text-sm
            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
          >
            {new Date(review.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        );
      },
    },
  ];

  const ratingOptions = [
    { label: "All Ratings", value: "" },
    { label: "5 Stars", value: "5" },
    { label: "4 Stars", value: "4" },
    { label: "3 Stars", value: "3" },
    { label: "2 Stars", value: "2" },
    { label: "1 Star", value: "1" },
  ];

  return (
    <div className={isDark ? "text-white" : "text-gray-900"}>
      {/* HEADER */}
      <div
        className={`
      flex flex-col md:flex-row
      md:items-center md:justify-between
      gap-5 p-5 border

      ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}
    `}
      >
        {/* LEFT */}
        <div>
          <h1
            className={`
          text-2xl font-semibold
          ${isDark ? "text-white" : "text-gray-900"}
        `}
          >
            Reviews
          </h1>

          <p
            className={`
          text-sm mt-1
          ${isDark ? "text-gray-400" : "text-gray-500"}
        `}
          >
            View and manage customer reviews.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-72">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div
        className={`
      flex flex-col md:flex-row
      md:items-end gap-5 p-5 border

      ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}
    `}
      >
        <div className="w-full md:w-auto">
          <Dropdown
            name="rating"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            options={ratingOptions}
          />
        </div>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 mt-12">
        <AdminPanelCard title="Total Reviews" value={reviewsData.length} />

        <AdminPanelCard
          title="5 Star Reviews"
          value={reviewsData.filter((item) => item.rating === 5).length}
        />

        <AdminPanelCard
          title="4 Star & Above"
          value={reviewsData.filter((item) => item.rating >= 4).length}
        />

        <AdminPanelCard
          title="Average Rating"
          value={
            reviewsData.length
              ? (
                  reviewsData.reduce((sum, item) => sum + item.rating, 0) /
                  reviewsData.length
                ).toFixed(1)
              : 0
          }
        />
      </div>

      <Table columns={reviewsColumns} data={filteredReviews} />
    </div>
  );
};

export default Review;
