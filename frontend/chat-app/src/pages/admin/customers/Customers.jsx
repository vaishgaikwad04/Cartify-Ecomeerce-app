import Table from "../../../components/ui/Table";
import ActionMenu from "../../../components/ui/ActionMenu";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import { useCustomer } from "../../../hooks/admin/customer/useCustomer";
import CustomersUpdate from "./CustomersUpdate";
import ViewModel from "../../../components/ui/ViewModel";

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
    handleViewCustomer,
    viewCustomerModel,
    setViewCustomerModel,
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
      render: (row) => (
        <ActionMenu
          row={row}
          onView={() => handleViewCustomer(row._id)}
          onEdit={() => handleUpdateCustomer(row._id)}
          disableDelete={true}
        />
      ),
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

      <ViewModel
        isOpen={viewCustomerModel}
        onClose={() => setViewCustomerModel(false)}
        title="Customer Profile"
      >
        {selectedCustomer && (
          <div
            className={`max-h-[75vh] ${
              isDark ? "text-gray-200" : "text-gray-900"
            }`}
          >
            <div className="space-y-6 pb-2">
              {/* ================= PROFILE HEADER ================= */}
              <section
                className={`relative overflow-hidden rounded-2xl border ${
                  isDark
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* subtle top background */}
                <div
                  className={`absolute inset-x-0 top-0 h-20 ${
                    isDark ? "bg-gray-700/40" : "bg-gray-50"
                  }`}
                />

                <div className="relative p-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold shadow-sm ${
                          isDark
                            ? "bg-white text-gray-900"
                            : "bg-gray-900 text-white"
                        }`}
                      >
                        {selectedCustomer.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <h2
                          className={`text-xl font-semibold tracking-tight ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {selectedCustomer.name || "Unknown Customer"}
                        </h2>

                        <p
                          className={`mt-1 truncate text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {selectedCustomer.email || "No email available"}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span
                            className={`text-xs ${
                              isDark ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            ID: {selectedCustomer._id || "-"}
                          </span>

                          <span
                            className={`h-1 w-1 rounded-full ${
                              isDark ? "bg-gray-600" : "bg-gray-300"
                            }`}
                          />

                          <span
                            className={`text-xs ${
                              isDark ? "text-gray-500" : "text-gray-400"
                            }`}
                          >
                            {selectedCustomer.phone || "No phone"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer badge */}
                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                        isDark
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      Customer
                    </span>
                  </div>
                </div>
              </section>

              {/* ================= OVERVIEW ================= */}
              <section>
                <div className="mb-3">
                  <h3
                    className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Overview
                  </h3>

                  <p
                    className={`mt-1 text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Customer purchase summary
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Orders */}
                  <div
                    className={`rounded-xl border p-4 ${
                      isDark
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p
                      className={`text-xs font-medium ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Total orders
                    </p>

                    <p
                      className={`mt-2 text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedCustomer.totalOrders ?? 0}
                    </p>
                  </div>

                  {/* Spent */}
                  <div
                    className={`rounded-xl border p-4 ${
                      isDark
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p
                      className={`text-xs font-medium ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Total spent
                    </p>

                    <p
                      className={`mt-2 text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹{selectedCustomer.totalSpent ?? 0}
                    </p>
                  </div>

                  {/* Average */}
                  <div
                    className={`rounded-xl border p-4 ${
                      isDark
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <p
                      className={`text-xs font-medium ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Average order
                    </p>

                    <p
                      className={`mt-2 text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹
                      {selectedCustomer.totalOrders
                        ? (
                            selectedCustomer.totalSpent /
                            selectedCustomer.totalOrders
                          ).toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= INFORMATION GRID ================= */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* ACCOUNT INFORMATION */}
                <section
                  className={`rounded-2xl border ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className={`border-b px-5 py-4 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Account Information
                    </h3>

                    <p
                      className={`mt-1 text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Registered customer details
                    </p>
                  </div>

                  <div className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-4">
                      <span className="text-xs text-gray-500">Customer ID</span>

                      <span
                        className={`max-w-[65%] break-all text-right text-xs ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {selectedCustomer._id || "-"}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs text-gray-500">Full name</span>

                      <span
                        className={`text-right text-sm font-medium ${
                          isDark ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {selectedCustomer.name || "-"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs text-gray-500">Email</span>

                      <span
                        className={`max-w-[65%] break-all text-right text-sm font-medium ${
                          isDark ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {selectedCustomer.email || "-"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs text-gray-500">Phone</span>

                      <span
                        className={`text-right text-sm font-medium ${
                          isDark ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {selectedCustomer.phone || "-"}
                      </span>
                    </div>

                  
                  </div>
                </section>

                {/* SHIPPING ADDRESS */}
                <section
                  className={`rounded-2xl border ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className={`border-b px-5 py-4 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Shipping Address
                    </h3>

                    <p
                      className={`mt-1 text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Latest delivery information
                    </p>
                  </div>

                  {selectedCustomer.address ? (
                    <div className="p-5">
                      <div
                        className={`rounded-xl p-4 ${
                          isDark ? "bg-gray-900" : "bg-gray-50"
                        }`}
                      >
                        <p
                          className={`text-sm font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {selectedCustomer.address.fullName || "-"}
                        </p>

                        <p
                          className={`mt-2 text-sm leading-6 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {selectedCustomer.address.addressLine || "-"}
                          <br />
                          {selectedCustomer.address.city || "-"},{" "}
                          {selectedCustomer.address.state || "-"}
                          {selectedCustomer.address.pincode
                            ? ` - ${selectedCustomer.address.pincode}`
                            : ""}
                        </p>

                        <div
                          className={`mt-4 border-t pt-3 ${
                            isDark ? "border-gray-800" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Contact number
                            </span>

                            <span
                              className={`text-xs font-medium ${
                                isDark ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {selectedCustomer.address.phone ||
                                selectedCustomer.phone ||
                                "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5">
                      <p className="text-sm text-gray-500">
                        No shipping address available.
                      </p>
                    </div>
                  )}
                </section>
              </div>

              {/* ================= LATEST ORDER ================= */}
              <section
                className={`rounded-2xl border ${
                  isDark
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div>
                    <h3
                      className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Latest Order
                    </h3>

                    <p
                      className={`mt-1 text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Most recent purchase activity
                    </p>
                  </div>

                  {selectedCustomer.lastOrderDate && (
                    <span className="text-xs text-gray-500">
                      {new Date(
                        selectedCustomer.lastOrderDate,
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
                  {/* Order Status */}
                  <div>
                    <p className="text-xs text-gray-500">Order status</p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                        selectedCustomer.lastOrderStatus === "delivered"
                          ? "bg-green-100 text-green-700"
                          : selectedCustomer.lastOrderStatus === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : selectedCustomer.lastOrderStatus === "shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedCustomer.lastOrderStatus || "-"}
                    </span>
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="text-xs text-gray-500">Payment status</p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                        selectedCustomer.lastPaymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : selectedCustomer.lastPaymentStatus === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedCustomer.lastPaymentStatus || "-"}
                    </span>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs text-gray-500">Order date</p>

                    <p
                      className={`mt-2 text-sm font-semibold ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {selectedCustomer.lastOrderDate
                        ? new Date(
                            selectedCustomer.lastOrderDate,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= ORDER HISTORY ================= */}
              <section
                className={`rounded-2xl border ${
                  isDark
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`border-b px-5 py-4 ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Order History
                      </h3>

                      <p
                        className={`mt-1 text-xs ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Customer's previous orders
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {selectedCustomer.orders?.length || 0} orders
                    </span>
                  </div>
                </div>

                {selectedCustomer.orders?.length > 0 ? (
                  <div>
                    {selectedCustomer.orders.map((order, index) => (
                      <div
                        key={order._id || index}
                        className={`px-5 py-4 ${
                          index !== selectedCustomer.orders.length - 1
                            ? `border-b ${
                                isDark ? "border-gray-700" : "border-gray-100"
                              }`
                            : ""
                        }`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          {/* Left */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm font-semibold ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                Order #
                                {order._id
                                  ? order._id.slice(-8).toUpperCase()
                                  : index + 1}
                              </p>

                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  isDark ? "bg-gray-600" : "bg-gray-300"
                                }`}
                              />

                              <p className="text-xs text-gray-500">
                                {order.createdAt
                                  ? new Date(
                                      order.createdAt,
                                    ).toLocaleDateString("en-IN", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "-"}
                              </p>
                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                              {order.items?.length || 0} item
                              {order.items?.length !== 1 ? "s" : ""}
                            </p>
                          </div>

                          {/* Right */}
                          <div className="flex items-center justify-between gap-4 sm:justify-end">
                            <div className="text-left sm:text-right">
                              <p
                                className={`text-sm font-semibold ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                ₹{order.total ?? 0}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {order.paymentStatus || "Payment unavailable"}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : order.status === "shipped"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-10 text-center">
                    <p className="text-sm text-gray-500">
                      This customer has not placed any orders yet.
                    </p>
                  </div>
                )}
              </section>

              {/* ================= FOOTER SUMMARY ================= */}
              <div
                className={`flex flex-col gap-2 rounded-xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                  isDark
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                <p className="text-xs">Customer lifetime value</p>

                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  ₹{selectedCustomer.totalSpent ?? 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </ViewModel>
    </div>
  );
};

export default Customers;
