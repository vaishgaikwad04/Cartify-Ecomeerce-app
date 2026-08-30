import Table from "../../../components/ui/Table";
import ActionMenu from "../../../components/ui/ActionMenu";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import { useCustomer } from "../../../hooks/admin/customer/useCustomer";

const Customers = () => {
  const {
    // Customer data
    filteredData,

    // Search
    search,
    setSearch,

    // Status filter
    status,
    setStatus,

    // Theme
    isDark,

    // Update customer
    selectedCustomer,
    showUpdateModal,
    setShowUpdateModal,
    handleUpdateCustomer,

    // Refresh
    fetchCustomers,

    // Statistics
    totalCustomers,
    totalOrders,
    totalRevenue,
    deliveredCustomers,
  } = useCustomer();

  const columns = [
    // =======================================================
    // CUSTOMER
    // =======================================================

    {
      key: "customer",
      label: "Customer",

      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className={`
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-sm font-semibold

              ${
                isDark
                  ? "bg-gray-200 text-gray-800"
                  : "bg-gray-100 text-gray-800"
              }
            `}
          >
            {row?.name?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div>
            <p
              className={`
                font-medium
                ${isDark ? "text-gray-200" : "text-gray-800"}
              `}
            >
              {row?.name.charAt(0).toUpperCase() + row.name.slice(1) ||
                "Unknown Customer"}
            </p>

            <p
              className={`
                text-xs
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
            >
              ID: {row?._id || "N/A"}
            </p>
          </div>
        </div>
      ),
    },

    // =======================================================
    // EMAIL
    // =======================================================

    {
      key: "email",
      label: "Email",

      render: (row) => (
        <span className={isDark ? "text-gray-300" : "text-gray-600"}>
          {row?.email || "No Email"}
        </span>
      ),
    },

    // =======================================================
    // PHONE
    // =======================================================

    {
      key: "phone",
      label: "Phone",

      render: (row) => (
        <span className={isDark ? "text-gray-300" : "text-gray-600"}>
          {row?.phone || "No Phone"}
        </span>
      ),
    },

    // =======================================================
    // LOCATION
    // =======================================================

    {
      key: "location",
      label: "Location",

      render: (row) => (
        <div>
          <p
            className={`
              text-sm
              ${isDark ? "text-gray-300" : "text-gray-700"}
            `}
          >
            {row?.address?.city.charAt(0).toUpperCase() +
              row?.address?.city.slice(1) || "N/A"}
          </p>

          <p
            className={`
              text-xs
              ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
          >
            {row?.address?.country.charAt(0).toUpperCase() +
              row?.address?.country.slice(1) || "N/A"}
          </p>
        </div>
      ),
    },

    // =======================================================
    // TOTAL ORDERS
    // =======================================================

    {
      key: "totalOrders",
      label: "Orders",

      render: (row) => (
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>
          {row?.totalOrders || 0}
        </span>
      ),
    },

    // =======================================================
    // TOTAL SPENT
    // =======================================================

    {
      key: "totalSpent",
      label: "Total Spent",

      render: (row) => (
        <span
          className={`
            font-medium
            ${isDark ? "text-gray-200" : "text-gray-800"}
          `}
        >
          ₹{row?.totalSpent || 0}
        </span>
      ),
    },

    // =======================================================
    // LAST ORDER
    // =======================================================

    {
      key: "lastOrderDate",
      label: "Last Order",

      render: (row) =>
        row?.lastOrderDate
          ? new Date(row.lastOrderDate).toLocaleDateString()
          : "N/A",
    },

    // =======================================================
    // STATUS
    // =======================================================

    {
      key: "lastOrderStatus",
      label: "Status",

      render: (row) => (
        <span
          className={`
            capitalize
            ${
              row?.lastOrderStatus === "delivered"
                ? "text-green-500"
                : row?.lastOrderStatus === "cancelled"
                  ? "text-red-500"
                  : row?.lastOrderStatus === "shipped"
                    ? "text-blue-500"
                    : "text-yellow-500"
            }
          `}
        >
          {row?.lastOrderStatus || "Pending"}
        </span>
      ),
    },

    // =======================================================
    // ACTIONS
    // =======================================================
    {
      key: "actions",
      label: "Actions",

      render: (row) => <ActionMenu row={row} onEdit={handleUpdateCustomer} />,
    },
  ];

  const statusOptions = [
    {
      key: "all",
      label: "All",
      value: "",
    },
    {
      key: "pending",
      label: "Pending",
      value: "pending",
    },
    {
      key: "shipped",
      label: "Shipped",
      value: "shipped",
    },
    {
      key: "delivered",
      label: "Delivered",
      value: "delivered",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      value: "cancelled",
    },
  ];

  return (
    <div className={isDark ? "text-white" : "text-gray-900"}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className={`
          flex flex-col md:flex-row
          md:items-center md:justify-between
          gap-5 p-5 border

          ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}
        `}
      >
        <div>
          <h1
            className={`
              text-2xl font-semibold
              ${isDark ? "text-white" : "text-gray-900"}
            `}
          >
            Customers
          </h1>

          <p
            className={`
              text-sm mt-1
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            View and manage customer information and order activity.
          </p>
        </div>

        <div className="w-full md:w-72">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div
        className={`
          flex flex-col md:flex-row
          md:items-end gap-5 p-5 border

          ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}
        `}
      >
        <div className="w-full md:w-auto">
          <Dropdown
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          mb-8
          mt-12
        "
      >
        <AdminPanelCard title="Total Customers" value={totalCustomers} />

        <AdminPanelCard title="Total Orders" value={totalOrders} />

        <AdminPanelCard title="Total Revenue" value={`₹${totalRevenue}`} />

        <AdminPanelCard title="Delivered" value={deliveredCustomers} />
      </div>

      {/* =====================================================
          CUSTOMERS TABLE
      ===================================================== */}

      <Table columns={columns} data={filteredData} />

      {showUpdateModal && selectedCustomer && (
        <CustomersUpdate
          user={selectedCustomer}
          onClose={() => setShowUpdateModal(false)}
          onRefresh={fetchCustomers}
        />
      )}
    </div>
  );
};

export default Customers;
