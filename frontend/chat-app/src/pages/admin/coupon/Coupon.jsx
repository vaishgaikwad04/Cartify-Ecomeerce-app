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

        ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
    `}
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
            Categories
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
            onClick={() => setIsModalOpen(true)}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateCoupon
          onRefresh={fetchCoupons}
          selectedCoupon={selectedCoupon}
        />
      </Modal>
    </div>
  );
};

export default Coupon;
