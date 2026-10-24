// import {
//   FiDollarSign,
//   FiShoppingBag,
//   FiUsers,
//   FiPackage,
//   FiClock,
//   FiXCircle,
// } from "react-icons/fi";
// import { useDashboard } from "../../../hooks/admin/dashboard/useDashboard";

// import AdminPanelCard from "../../../components/ui/AdminPanelCard";
// import Table from "../../../components/ui/Table";
// import RevenueChart from "./RevenueChart";

// const Dashboard = () => {
//   const {
//     // Dark mode status
//     isDark,

//     // Total number of orders
//     totalOrders,

//     // Total number of customers
//     totalCustomers,

//     // Total number of products
//     totalProducts,

//     // Number of orders currently being processed
//     processingOrders,

//     // Number of orders that have been shipped
//     shippedOrders,

//     // Number of orders that have been delivered
//     deliveredOrders,

//     // Number of orders that have been cancelled
//     cancelledOrders,

//     // Total revenue generated from orders
//     totalRevenue,

//     // List of the most recent orders
//     recentOrders,
//   } = useDashboard();

//   const orderColumns = [
//     {
//       key: "customer",
//       label: "Customer",

//       render: (row) => {
//         const customerName =
//           row?.userId?.name.charAt(0).toUpperCase() +
//             row?.userId?.name.slice(1) ||
//           row?.name ||
//           "Unknown User";

//         const firstLetter = customerName?.charAt(0)?.toUpperCase() || "U";

//         return (
//           <div className="flex items-center gap-3">
//             {/* Avatar */}
//             <div
//               className={`
//             flex
//             h-9
//             w-9
//             shrink-0
//             items-center
//             justify-center
//             rounded-lg
//             border
//             text-sm
//             font-semibold
//             uppercase

//             ${
//               isDark
//                 ? "border-gray-200 bg-white text-black"
//                 : "border-gray-200 bg-gray-100 text-gray-700"
//             }
//           `}
//             >
//               {firstLetter}
//             </div>

//             {/* Customer Name */}
//             <p
//               className={`
//             truncate
//             max-w-[180px]
//             text-sm
//             font-medium

//             ${isDark ? "text-gray-200" : "text-gray-800"}
//           `}
//             >
//               {customerName}
//             </p>
//           </div>
//         );
//       },
//     },
//     // ---------------------------------------------------
//     // ORDER ID
//     // ---------------------------------------------------

//     {
//       key: "_id",
//       label: "Order ID",

//       render: (row) => (
//         <span
//           className={`
//             font-mono
//             text-xs

//             ${isDark ? "text-gray-400" : "text-gray-500"}
//           `}
//         >
//           #{row?._id?.slice(-8) || "--------"}
//         </span>
//       ),
//     },

//     // ---------------------------------------------------
//     // ITEMS
//     // ---------------------------------------------------

//     {
//       key: "items",
//       label: "Items",

//       render: (row) => {
//         const totalItems =
//           row?.items?.reduce(
//             (total, item) => total + Number(item?.quantity || 0),
//             0,
//           ) || 0;

//         return (
//           <span className={isDark ? "text-gray-300" : "text-gray-600"}>
//             {totalItems} {totalItems === 1 ? "item" : "items"}
//           </span>
//         );
//       },
//     },

//     // ---------------------------------------------------
//     // TOTAL
//     // ---------------------------------------------------

//     {
//       key: "total",
//       label: "Total",

//       render: (row) => (
//         <span
//           className={`
//             font-medium

//             ${isDark ? "text-gray-200" : "text-gray-800"}
//           `}
//         >
//           ₹{Number(row?.total || 0).toLocaleString("en-IN")}
//         </span>
//       ),
//     },

//     // ---------------------------------------------------
//     // PAYMENT STATUS
//     // ---------------------------------------------------

//     {
//       key: "paymentStatus",
//       label: "Payment",

//       render: (row) => {
//         const status = row?.paymentStatus?.toLowerCase() || "pending";

//         const statusStyle = {
//           paid: isDark
//             ? "bg-emerald-950 text-emerald-400 border-emerald-800"
//             : "bg-emerald-50 text-emerald-700 border-emerald-200",

//           pending: isDark
//             ? "bg-amber-950 text-amber-400 border-amber-800"
//             : "bg-amber-50 text-amber-700 border-amber-200",

//           failed: isDark
//             ? "bg-red-950 text-red-400 border-red-800"
//             : "bg-red-50 text-red-700 border-red-200",

//           refunded: isDark
//             ? "bg-purple-950 text-purple-400 border-purple-800"
//             : "bg-purple-50 text-purple-700 border-purple-200",
//         };

//         return (
//           <span
//             className={`
//               inline-flex
//               rounded-full
//               border
//               px-2.5
//               py-1
//               text-xs
//               font-medium
//               capitalize

//               ${
//                 statusStyle[status] ||
//                 (isDark
//                   ? "bg-gray-800 text-gray-300 border-gray-700"
//                   : "bg-gray-50 text-gray-600 border-gray-200")
//               }
//             `}
//           >
//             {status}
//           </span>
//         );
//       },
//     },

//     // ---------------------------------------------------
//     // ORDER STATUS
//     // ---------------------------------------------------

//     {
//       key: "status",
//       label: "Order Status",

//       render: (row) => {
//         const status = row?.status?.toLowerCase() || "processing";

//         const statusStyle = {
//           processing: isDark
//             ? "bg-amber-950 text-amber-400 border-amber-800"
//             : "bg-amber-50 text-amber-700 border-amber-200",

//           shipped: isDark
//             ? "bg-blue-950 text-blue-400 border-blue-800"
//             : "bg-blue-50 text-blue-700 border-blue-200",

//           delivered: isDark
//             ? "bg-emerald-950 text-emerald-400 border-emerald-800"
//             : "bg-emerald-50 text-emerald-700 border-emerald-200",

//           cancelled: isDark
//             ? "bg-red-950 text-red-400 border-red-800"
//             : "bg-red-50 text-red-700 border-red-200",
//         };

//         return (
//           <span
//             className={`
//               inline-flex
//               rounded-full
//               border
//               px-2.5
//               py-1
//               text-xs
//               font-medium
//               capitalize

//               ${
//                 statusStyle[status] ||
//                 (isDark
//                   ? "bg-gray-800 text-gray-300 border-gray-700"
//                   : "bg-gray-50 text-gray-600 border-gray-200")
//               }
//             `}
//           >
//             {status}
//           </span>
//         );
//       },
//     },

//     // ---------------------------------------------------
//     // CREATED AT
//     // ---------------------------------------------------

//     {
//       key: "createdAt",
//       label: "Created At",

//       render: (row) => (
//         <span className={isDark ? "text-gray-400" : "text-gray-500"}>
//           {row?.createdAt
//             ? new Date(row.createdAt).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })
//             : "-"}
//         </span>
//       ),
//     },

//     // ---------------------------------------------------
//     // ACTION
//     // ---------------------------------------------------
//   ];

//   return (
//     <div
//       className={`
//         min-h-screen

//         ${isDark ? "text-white" : "text-gray-900"}
//       `}
//     >
//       {/*HEADER*/}
//       <div
//         className={`rounded-2xl p-8 shadow-sm mb-6 border ${
//           isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
//         }`}
//       >
//         <h1
//           className={`text-3xl font-bold ${
//             isDark ? "text-white" : "text-gray-900"
//           }`}
//         >
//           Dashboard
//         </h1>

//         <p
//           className={`
//             mt-1
//             text-sm

//             ${isDark ? "text-gray-400" : "text-gray-500"}
//           `}
//         >
//           Here's an overview of your store.
//         </p>
//       </div>

//       {/*MAIN STATISTICS*/}
//       <div
//         className="
//           grid
//           grid-cols-1
//           gap-5
//           sm:grid-cols-2
//           lg:grid-cols-4
//         "
//       >
//         {/* TOTAL REVENUE */}
//         <AdminPanelCard
//           title="Total Revenue"
//           value={`₹${totalRevenue.toLocaleString("en-IN")}`}
//           subtitle="Revenue from paid orders"
//           icon={<FiDollarSign />}
//         />

//         {/* TOTAL ORDERS */}
//         <AdminPanelCard
//           title="Total Orders"
//           value={totalOrders}
//           subtitle="All customer orders"
//           icon={<FiShoppingBag />}
//         />

//         {/* CUSTOMERS */}
//         <AdminPanelCard
//           title="Total Customers"
//           value={totalCustomers}
//           subtitle="Registered customers"
//           icon={<FiUsers />}
//         />

//         {/* PRODUCTS */}
//         <AdminPanelCard
//           title="Total Products"
//           value={totalProducts}
//           subtitle="Products in store"
//           icon={<FiPackage />}
//         />
//       </div>

//       {/*ORDER STATISTICS*/}
//       <div
//         className="
//           mt-5
//           grid
//           grid-cols-1
//           gap-5
//           sm:grid-cols-2
//           lg:grid-cols-4
//         "
//       >
//         {/* PROCESSING */}
//         <AdminPanelCard
//           title="Processing Orders"
//           value={processingOrders}
//           subtitle="Orders being processed"
//           icon={<FiClock />}
//         />

//         {/* SHIPPED */}
//         <AdminPanelCard
//           title="Shipped Orders"
//           value={shippedOrders}
//           subtitle="Orders on the way"
//           icon={<FiShoppingBag />}
//         />

//         {/* DELIVERED */}
//         <AdminPanelCard
//           title="Delivered Orders"
//           value={deliveredOrders}
//           subtitle="Successfully delivered"
//           icon={<FiPackage />}
//         />

//         {/* CANCELLED */}
//         <AdminPanelCard
//           title="Cancelled Orders"
//           value={cancelledOrders}
//           subtitle="Cancelled orders"
//           icon={<FiXCircle />}
//         />
//       </div>

//     <div className="mt-6">
//       <RevenueChart/>
//     </div>
      
//     </div>
//   );
// };

// export default Dashboard;

import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

import { useDashboard } from "../../../hooks/admin/dashboard/useDashboard";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import Table from "../../../components/ui/Table";
import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  const {
    isDark,
    totalOrders,
    totalCustomers,
    totalProducts,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
    recentOrders,
  } = useDashboard();

  const textPrimary = isDark ? "text-gray-100" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";

  const panelStyle = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const getStatusStyle = (status, type) => {
    const normalizedStatus = String(status || "").toLowerCase();

    const styles = {
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
      styles[normalizedStatus] ||
      (isDark
        ? "bg-gray-700 text-gray-300 border-gray-600"
        : "bg-gray-50 text-gray-600 border-gray-200")
    );
  };

  const renderStatus = (value, type) => {
    const fallback = type === "payment" ? "pending" : "processing";
    const status = String(value || fallback).toLowerCase();

    return (
      <span
        className={`inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium capitalize leading-none ${getStatusStyle(
          status,
          type
        )}`}
      >
        {status}
      </span>
    );
  };

  const orderColumns = [
    {
      key: "customer",
      label: "Customer",
      render: (row) => {
        const rawName =
          row?.userId?.name || row?.name || "Unknown User";

        const customerName =
          rawName.charAt(0).toUpperCase() + rawName.slice(1);

        const firstLetter = customerName.charAt(0) || "U";

        return (
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-gray-100"
                  : "border-gray-200 bg-gray-100 text-gray-700"
              }`}
            >
              {firstLetter}
            </div>

            <span
              className={`max-w-[160px] truncate text-xs font-medium ${textPrimary}`}
              title={customerName}
            >
              {customerName}
            </span>
          </div>
        );
      },
    },
    {
      key: "_id",
      label: "Order ID",
      render: (row) => (
        <span
          className={`whitespace-nowrap font-mono text-[11px] ${textSecondary}`}
        >
          #{row?._id?.slice(-8) || "--------"}
        </span>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (row) => {
        const totalItems =
          row?.items?.reduce(
            (total, item) => total + Number(item?.quantity || 0),
            0
          ) || 0;

        return (
          <span className={`whitespace-nowrap text-xs ${textSecondary}`}>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        );
      },
    },
    {
      key: "total",
      label: "Total",
      render: (row) => (
        <span className={`whitespace-nowrap text-xs font-semibold ${textPrimary}`}>
          {formatCurrency(row?.total)}
        </span>
      ),
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (row) => renderStatus(row?.paymentStatus, "payment"),
    },
    {
      key: "status",
      label: "Order Status",
      render: (row) => renderStatus(row?.status, "order"),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (row) => (
        <span className={`whitespace-nowrap text-xs ${textSecondary}`}>
          {formatDate(row?.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <div className={`min-h-full space-y-4 ${textPrimary}`}>
      {/* Dashboard heading */}
      <section
        className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 shadow-sm ${panelStyle}`}
      >
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className={`mt-0.5 text-xs ${textSecondary}`}>
            Here's an overview of your store.
          </p>
        </div>

        <span
          className={`rounded-md border px-2.5 py-1 text-[11px] font-medium ${
            isDark
              ? "border-gray-600 bg-gray-700 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        >
          Store Overview
        </span>
      </section>

      {/* Main statistics */}
      <section>
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Store Performance</h2>
          <span className={`text-[11px] ${textSecondary}`}>
            Key metrics
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AdminPanelCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            subtitle="Revenue from paid orders"
            icon={<FiDollarSign />}
          />

          <AdminPanelCard
            title="Total Orders"
            value={totalOrders ?? 0}
            subtitle="All customer orders"
            icon={<FiShoppingBag />}
          />

          <AdminPanelCard
            title="Total Customers"
            value={totalCustomers ?? 0}
            subtitle="Registered customers"
            icon={<FiUsers />}
          />

          <AdminPanelCard
            title="Total Products"
            value={totalProducts ?? 0}
            subtitle="Products in store"
            icon={<FiPackage />}
          />
        </div>
      </section>

      {/* Order statistics */}
      {/* <section>
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Order Status</h2>
          <span className={`text-[11px] ${textSecondary}`}>
            Order breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AdminPanelCard
            title="Processing Orders"
            value={processingOrders ?? 0}
            subtitle="Orders being processed"
            icon={<FiClock />}
          />

          <AdminPanelCard
            title="Shipped Orders"
            value={shippedOrders ?? 0}
            subtitle="Orders on the way"
            icon={<FiShoppingBag />}
          />

          <AdminPanelCard
            title="Delivered Orders"
            value={deliveredOrders ?? 0}
            subtitle="Successfully delivered"
            icon={<FiPackage />}
          />

          <AdminPanelCard
            title="Cancelled Orders"
            value={cancelledOrders ?? 0}
            subtitle="Cancelled orders"
            icon={<FiXCircle />}
          />
        </div>
      </section> */}

      {/* Revenue chart */}
      <section
        className={`min-w-0 overflow-hidden rounded-xl border p-3 sm:p-4 ${panelStyle}`}
      >
        <div className="mb-3">
          <h2 className="text-sm font-semibold">Revenue Analytics</h2>
          <p className={`mt-0.5 text-xs ${textSecondary}`}>
            Review your store's revenue performance.
          </p>
        </div>

        <div className="min-w-0">
          <RevenueChart />
        </div>
      </section>
{/* 
    
      <section
        className={`min-w-0 overflow-hidden rounded-xl border ${panelStyle}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-inherit px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold">Recent Orders</h2>
            <p className={`mt-0.5 text-xs ${textSecondary}`}>
              Latest orders from your store.
            </p>
          </div>

          <span className={`text-[11px] ${textSecondary}`}>
            {(recentOrders || []).length} records
          </span>
        </div>

        {/* <Table
          data={recentOrders || []}
          columns={orderColumns}
        /> 
      </section> */}
    </div>
  );
};

export default Dashboard;
