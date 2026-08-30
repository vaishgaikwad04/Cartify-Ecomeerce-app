import Table from "../../../components/ui/Table";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import Modal from "../../../components/ui/Modal";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import { useOrders } from "../../../hooks/admin/orders/useOrders";

const Order = () => {
  const {
    isDark,
    orderData,
    filteredData,

    search,
    setSearch,

    selectedStatus,
    setSelectedStatus,

    selectedPaymentStatus,
    setSelectedPaymentStatus,

    loading,

    selectedOrder,

    showManageModal,
    setShowManageModal,

    orderStatus,
    setOrderStatus,

    paymentStatus,
    setPaymentStatus,

    updatingStatus,
    handleUpdateStatus,

    handleManageOrder,
  } = useOrders();

  const statusOptions = [
    {
      label: "All Status",
      value: "",
    },

    {
      label: "Processing",
      value: "processing",
    },

    {
      label: "Shipped",
      value: "shipped",
    },

    {
      label: "Delivered",
      value: "delivered",
    },

    {
      label: "Cancelled",
      value: "cancelled",
    },
  ];

  const paymentStatusOptions = [
    {
      label: "All Payments",
      value: "",
    },

    {
      label: "Paid",
      value: "paid",
    },

    {
      label: "Pending",
      value: "pending",
    },

    {
      label: "Failed",
      value: "failed",
    },

    {
      label: "Refunded",
      value: "refunded",
    },
  ];

  const orderColumns = [
    {
      key: "customer",
      label: "Customer",

      render: (row) => {
        const customerName =
          row?.userId?.name.charAt(0).toUpperCase() +
            row?.userId?.name.slice(1) ||
          row?.name ||
          "Unknown User";

        const firstLetter = customerName?.charAt(0)?.toUpperCase() || "U";

        return (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            text-sm
            font-semibold
            uppercase

            ${
              isDark
                ? "border-gray-200 bg-white text-black"
                : "border-gray-200 bg-gray-100 text-gray-700"
            }
          `}
            >
              {firstLetter}
            </div>

            {/* Customer Name */}
            <p
              className={`
            truncate
            max-w-[180px]
            text-sm
            font-medium

            ${isDark ? "text-gray-200" : "text-gray-800"}
          `}
            >
              {customerName}
            </p>
          </div>
        );
      },
    },

    {
      key: "_id",
      label: "Order ID",

      render: (row) => (
        <span className="font-mono text-xs">#{row?._id?.slice(-8)}</span>
      ),
    },

    {
      key: "items",
      label: "Items",

      render: (row) => {
        const totalItems =
          row?.items?.reduce(
            (total, item) => total + (item?.quantity || 0),
            0,
          ) || 0;

        return (
          <span>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        );
      },
    },

    {
      key: "total",
      label: "Total",

      render: (row) => (
        <span className="font-medium">
          ₹{Number(row?.total || 0).toLocaleString("en-IN")}
        </span>
      ),
    },

    {
      key: "paymentStatus",
      label: "Payment",

      render: (row) => {
        const status = row?.paymentStatus || "pending";

        const statusStyle = {
          paid: isDark
            ? "bg-emerald-950 text-emerald-400 border-emerald-800"
            : "bg-emerald-50 text-emerald-700 border-emerald-200",

          pending: isDark
            ? "bg-amber-950 text-amber-400 border-amber-800"
            : "bg-amber-50 text-amber-700 border-amber-200",

          failed: isDark
            ? "bg-red-950 text-red-400 border-red-800"
            : "bg-red-50 text-red-700 border-red-200",

          refunded: isDark
            ? "bg-purple-950 text-purple-400 border-purple-800"
            : "bg-purple-50 text-purple-700 border-purple-200",
        };

        return (
          <span
            className={`
                            inline-flex
                            rounded-full
                            border
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            capitalize

                            ${
                              statusStyle[status] ||
                              (isDark
                                ? "bg-gray-800 text-gray-300 border-gray-700"
                                : "bg-gray-50 text-gray-600 border-gray-200")
                            }
                        `}
          >
            {status}
          </span>
        );
      },
    },

    {
      key: "status",
      label: "Order Status",

      render: (row) => {
        const status = row?.status || "processing";

        const statusStyle = {
          processing: isDark
            ? "bg-amber-950 text-amber-400 border-amber-800"
            : "bg-amber-50 text-amber-700 border-amber-200",

          shipped: isDark
            ? "bg-blue-950 text-blue-400 border-blue-800"
            : "bg-blue-50 text-blue-700 border-blue-200",

          delivered: isDark
            ? "bg-emerald-950 text-emerald-400 border-emerald-800"
            : "bg-emerald-50 text-emerald-700 border-emerald-200",

          cancelled: isDark
            ? "bg-red-950 text-red-400 border-red-800"
            : "bg-red-50 text-red-700 border-red-200",
        };

        return (
          <span
            className={`
                            inline-flex
                            rounded-full
                            border
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            capitalize

                            ${
                              statusStyle[status] ||
                              (isDark
                                ? "bg-gray-800 text-gray-300 border-gray-700"
                                : "bg-gray-50 text-gray-600 border-gray-200")
                            }
                        `}
          >
            {status}
          </span>
        );
      },
    },

    {
      key: "createdAt",
      label: "Created At",

      render: (row) => (
        <span>
          {row?.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
        </span>
      ),
    },

    {
      header: "Action",
      render: (row) => (
        <button
          type="button"
          onClick={() => handleManageOrder(row)}
          className={`
                rounded-md
                border
                px-3
                py-1.5
                text-xs
                font-medium
                transition
                ${
                  isDark
                    ? "border-gray-200 text-gray-300 hover:bg-gray-700"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }
            `}
        >
          Manage
        </button>
      ),
    },
  ];

  return (
    <div className={isDark ? "text-white" : "text-gray-900"}>
      <div
        className={`
                    space-y-0
                    rounded
                    border
                    shadow-sm
                    mb-12

                    ${
                      isDark
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }
                `}
      >
        {/* HEADER */}
        <div
          className={`
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-5
                        p-5
                        border

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
                                text-2xl
                                font-semibold

                                ${isDark ? "text-white" : "text-gray-900"}
                            `}
            >
              Orders
            </h1>

            <p
              className={`
                                text-sm
                                mt-1

                                ${isDark ? "text-gray-400" : "text-gray-500"}
                            `}
            >
              View and manage all customer orders in your admin dashboard.
            </p>
          </div>

          {/* SEARCH */}

          <div
            className="
                            w-full
                            md:w-80
                        "
          >
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/*FILTER*/}
        <div
          className={`
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        gap-5
                        p-5
                        border

                        ${
                          isDark
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-100"
                        }
                    `}
        >
          {/* ORDER STATUS */}

          <div
            className="
                            w-full
                            md:w-auto
                        "
          >
            <Dropdown
              name="orderStatus"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={statusOptions}
            />
          </div>

          {/* PAYMENT STATUS */}

          <div
            className="
                            w-full
                            md:w-auto
                        "
          >
            <Dropdown
              name="paymentStatus"
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              options={paymentStatusOptions}
            />
          </div>
        </div>
        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
          <AdminPanelCard title="Total Orders" value={orderData.length} />

          <AdminPanelCard
            title="Processing"
            value={
              orderData.filter((item) => item?.status === "processing").length
            }
          />

          <AdminPanelCard
            title="Shipped"
            value={
              orderData.filter((item) => item?.status === "shipped").length
            }
          />

          <AdminPanelCard
            title="Delivered"
            value={
              orderData.filter((item) => item?.status === "delivered").length
            }
          />

          <AdminPanelCard
            title="Cancelled"
            value={
              orderData.filter((item) => item?.status === "cancelled").length
            }
          />
        </div>
      </div>

      {/*model*/}
      <Modal isOpen={showManageModal} onClose={() => setShowManageModal(false)}>
        {selectedOrder && (
          <div
            className={`
                w-full max-w-2xl
                rounded-xl
                p-6
                ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
            `}
          >
            {/* HEADER */}

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Manage Order</h2>

              <p
                className={`
                        mt-1 text-xs
                        ${isDark ? "text-gray-500" : "text-gray-400"}
                    `}
              >
                Order ID: #{selectedOrder._id?.slice(-8)}
              </p>
            </div>

            {/* CUSTOMER */}

            <div className="mb-5">
              <h3 className="mb-3 text-sm font-semibold">Customer</h3>

              <div
                className={`
                        rounded-lg border p-4
                        ${
                          isDark
                            ? "border-gray-700 bg-gray-800"
                            : "border-gray-200 bg-gray-50"
                        }
                    `}
              >
                <p className="text-sm font-medium">
                  {selectedOrder.userId?.name || "Unknown"}
                </p>

                <p
                  className={`
                            mt-1 text-xs
                            ${isDark ? "text-gray-400" : "text-gray-500"}
                        `}
                >
                  {selectedOrder.userId?.email || "-"}
                </p>
              </div>
            </div>

            {/* ORDER ITEMS */}

            <div className="mb-5">
              <h3 className="mb-3 text-sm font-semibold">Order Items</h3>

              <div className="space-y-2">
                {selectedOrder.items?.map((item, index) => (
                  <div
                    key={item.productId || index}
                    className={`
                                flex items-center
                                justify-between
                                border-b py-3
                                ${
                                  isDark ? "border-gray-800" : "border-gray-100"
                                }
                            `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Product Image */}
                      <div
                        className={`
            h-16 w-16
            shrink-0
            overflow-hidden
            rounded-lg
            border
            ${
              isDark
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            }
        `}
                      >
                        <img
                          src={item.image || item.img}
                          alt={item.productName || "Product"}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="min-w-0">
                        <p
                          className={`
                truncate
                text-sm
                font-medium
                ${isDark ? "text-gray-100" : "text-gray-900"}
            `}
                        >
                          {item.productName}
                        </p>

                        <p
                          className={`
                mt-1 text-xs
                ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
                        >
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm">
                      ₹{Number(item.productPrice || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL */}

            <div
              className={`
                    mb-5 flex items-center
                    justify-between
                    border-t pt-4
                    ${isDark ? "border-gray-700" : "border-gray-200"}
                `}
            >
              <span className="text-sm font-medium">Total</span>

              <span className="text-lg font-semibold">
                ₹{Number(selectedOrder.total || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* PAYMENT STATUS */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Payment Status
              </label>

              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className={`
            w-full rounded-lg border
            px-3 py-2.5
            text-sm outline-none
            ${
              isDark
                ? "border-gray-700 bg-gray-800 text-white"
                : "border-gray-200 bg-white text-gray-900"
            }
        `}
              >
                <option value="pending">Pending</option>

                <option value="paid">Paid</option>

                <option value="failed">Failed</option>

                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* ORDER STATUS */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Order Status
              </label>

              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className={`
                        w-full rounded-lg border
                        px-3 py-2.5
                        text-sm outline-none
                        ${
                          isDark
                            ? "border-gray-700 bg-gray-800 text-white"
                            : "border-gray-200 bg-white text-gray-900"
                        }
                    `}
              >
                <option value="processing">Processing</option>

                <option value="shipped">Shipped</option>

                <option value="delivered">Delivered</option>

                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* ACTIONS */}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowManageModal(false)}
                disabled={updatingStatus}
                className={`
                        rounded-lg
                        border
                        px-4 py-2
                        text-sm
                        font-medium
                        transition
                        ${
                          isDark
                            ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }
                    `}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdateStatus}
                disabled={updatingStatus}
                className="
                        rounded-lg
                        bg-gray-200
                        px-4 py-2
                        text-sm
                        font-medium
                        text-black
                        transition
                        hover:bg-gray-300
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
              >
                {updatingStatus ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {loading ? (
        <div
          className={`
                        rounded
                        border
                        p-10
                        text-center

                        ${
                          isDark
                            ? "bg-gray-900 border-gray-700 text-gray-400"
                            : "bg-white border-gray-200 text-gray-500"
                        }
                    `}
        >
          Loading orders...
        </div>
      ) : (
        <Table columns={orderColumns} data={filteredData} />
      )}
    </div>
  );
};

export default Order;
