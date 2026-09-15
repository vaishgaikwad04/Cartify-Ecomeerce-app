import Modal from "../../../components/ui/Modal";
import SearchBar from "../../../components/ui/SearchBar";
import Button from "../../../components/ui/Button";
import { IoIosAdd } from "react-icons/io";
import Table from "../../../components/ui/Table";
import ActionMenu from "../../../components/ui/ActionMenu";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import Dropdown from "../../../components/ui/Dropdown";
import { useCoupon } from "../../../hooks/admin/coupon/useCoupon";
import CreateCoupon from "./CreateCoupon";
import ViewModel from "../../../components/ui/ViewModel";

const Coupon = () => {
  const {
    // Modal
    isModalOpen,
    setIsModalOpen,

    // Search
    search,
    setSearch,

    // Coupons
    couponsData,

    // Selected coupon
    selectedCoupon,
    setSelectedCoupon,
    setSelectedCouponId,

    // Filters
    discountType,
    setDiscountType,
    status,
    setStatus,

    // Functions
    fetchCoupons,
    handleEditCoupon,
    handleDeleteCoupon,

    // Filtered data
    filteredCoupons,
    handleViewCoupon,
    setViewModelOpen,
    viewModelOpen,
    viewCoupon,

    // Theme
    isDark,
  } = useCoupon();

  const couponColumns = [
    {
      key: "code",
      label: "Code",
      render: (row) => {
        const code = row?.code || "Unknown";
        const firstLetter = code?.charAt(0)?.toUpperCase() || "U";

        return (
          <div className="flex items-center gap-3">
            <div
              className={`
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg border text-sm font-semibold uppercase
              ${
                isDark
                  ? "border-gray-200 bg-white text-black"
                  : "border-gray-200 bg-gray-100 text-gray-700"
              }
            `}
            >
              {firstLetter}
            </div>

            <p
              className={`
              max-w-[180px] truncate text-sm font-medium
              ${isDark ? "text-gray-200" : "text-gray-800"}
            `}
            >
              {code}
            </p>
          </div>
        );
      },
    },

    {
      key: "discountType",
      label: "Discount Type",
    },

    {
      key: "minOrderAmount",
      label: "Min Order Amount",
      render: (row) => `₹${row?.minOrderAmount ?? 0}`,
    },

    {
      key: "discount",
      label: "Discount",
      render: (row) =>
        row?.discountType === "percentage"
          ? `${row?.discount ?? 0}%`
          : `₹${row?.discount ?? 0}`,
    },

    {
      key: "isActive",
      label: "Status",
      render: (row) => (row.isActive ? "Active" : "Inactive"),
    },

    {
      key: "expiryDate",
      label: "Expiry Date",
      render: (row) =>
        row?.expiryDate ? new Date(row.expiryDate).toLocaleDateString() : "-",
    },

    {
      key: "createdAt",
      label: "Created",
      render: (row) =>
        row?.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
    },

    {
      key: "actions",
      label: "",
      render: (row) => (
        <ActionMenu
          row={row}
          onView={() => handleViewCoupon(row._id)}
          onEdit={handleEditCoupon}
          onDelete={handleDeleteCoupon}
        />
      ),
    },
  ];

  const discountTypeOptions = [
    { value: "all", label: "All" },
    { value: "percentage", label: "Percentage" },
    { value: "fixed", label: "Fixed Amount" },
  ];

  const couponStatusOptions = [
    { value: "all", label: "All" },
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  return (
    <div
      className={`
        rounded-xl overflow-hidden
        ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* HEADER */}
      <div
        className={`
            flex flex-col md:flex-row
            md:items-center md:justify-between
            gap-5 p-5 border

            ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }
        `}
      >
        <div>
          <h1
            className={`
                    text-2xl font-semibold
                    ${isDark ? "text-white" : "text-gray-900"}
                `}
          >
            Coupons
          </h1>

          <p
            className={`
                    text-sm mt-1
                    ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
          >
            View and manage all Coupons in your admin dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-72">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            className="h-12 w-full sm:w-auto px-5"
            label="Add Coupons"
            icon={<IoIosAdd className="text-xl" />}
            onClick={() => {
              setSelectedCoupon(null);
              setSelectedCouponId(null);
              setIsModalOpen(true);
            }}
            variant={isDark ? "secondary" : "primary"}
          />
        </div>
      </div>

      {/* FILTERS */}
      <div
        className={`
            flex flex-col md:flex-row
            md:items-end gap-5 p-5 border

            ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }
        `}
      >
        <div className="w-full md:w-auto">
          <Dropdown
            name="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            options={discountTypeOptions}
          />
        </div>

        <div className="w-full md:w-auto">
          <Dropdown
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={couponStatusOptions}
          />
        </div>
      </div>

      {/* STATISTICS */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AdminPanelCard title="Total coupons" value={couponsData.length} />

          <AdminPanelCard
            title="Active"
            value={couponsData.filter((item) => item.isActive === true).length}
          />

          <AdminPanelCard
            title="Inactive"
            value={couponsData.filter((item) => item.isActive === false).length}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="p-5">
        <Table columns={couponColumns} data={filteredCoupons} />
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCoupon(null);
          setSelectedCouponId(null);
        }}
      >
        <CreateCoupon
          onRefresh={fetchCoupons}
          selectedCoupon={selectedCoupon}
          setIsModalOpen={setIsModalOpen}
          setSelectedCouponId={setSelectedCouponId}
          setSelectedCoupon={setSelectedCoupon}
        />
      </Modal>

      {viewModelOpen && (
        <ViewModel
          isOpen={viewModelOpen}
          onClose={() => setViewModelOpen(false)}
          title="Coupon Details"
        >
          {viewCoupon && (
            <div className="space-y-6">
              {/* Coupon Header */}
              <div
                className={`rounded-xl border p-5 ${
                  isDark
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p
                        className={`text-xs font-medium uppercase tracking-wider ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Coupon Code
                      </p>

                      <h2
                        className={`mt-1 text-xl font-bold tracking-wide ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {viewCoupon.code}
                      </h2>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      selectedCoupon.isActive
                        ? isDark
                          ? "bg-green-900/40 text-green-400"
                          : "bg-green-100 text-green-700"
                        : isDark
                          ? "bg-red-900/40 text-red-400"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedCoupon.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Discount Highlight */}
              <div
                className={`rounded-xl border p-5 ${
                  isDark
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Discount Offer
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span
                    className={`text-3xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedCoupon.discountType === "percentage"
                      ? `${selectedCoupon.discount}%`
                      : `₹${selectedCoupon.discount}`}
                  </span>

                  <span
                    className={`mb-1 text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {selectedCoupon.discountType === "percentage"
                      ? "OFF"
                      : "discount"}
                  </span>
                </div>

                <span
                  className={`mt-3 inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
                    isDark
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedCoupon.discountType === "percentage"
                    ? "Percentage Discount"
                    : "Fixed Amount Discount"}
                </span>
              </div>

              {/* Coupon Information */}
              <div>
                <h3
                  className={`mb-3 text-sm font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Coupon Information
                </h3>

                <div
                  className={`overflow-hidden rounded-xl border ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  {/* Minimum Order */}
                  <div
                    className={`flex items-center justify-between px-4 py-4 ${
                      isDark
                        ? "border-b border-gray-700"
                        : "border-b border-gray-100"
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Minimum Order Amount
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹{selectedCoupon.minOrderAmount ?? 0}
                    </span>
                  </div>

                  {/* Expiry */}
                  <div
                    className={`flex items-center justify-between px-4 py-4 ${
                      isDark
                        ? "border-b border-gray-700"
                        : "border-b border-gray-100"
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Expiry Date
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedCoupon.expiryDate
                        ? new Date(
                            selectedCoupon.expiryDate,
                          ).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>

                  {/* Created */}
                  <div className="flex items-center justify-between px-4 py-4">
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Created Date
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedCoupon.createdAt
                        ? new Date(
                            selectedCoupon.createdAt,
                          ).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coupon Summary */}
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  isDark
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                This coupon is currently{" "}
                <span
                  className={`font-semibold ${
                    selectedCoupon.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedCoupon.isActive ? "active" : "inactive"}
                </span>{" "}
                and can be managed from the coupon actions menu.
              </div>
            </div>
          )}
        </ViewModel>
      )}
    </div>
  );
};

export default Coupon;
