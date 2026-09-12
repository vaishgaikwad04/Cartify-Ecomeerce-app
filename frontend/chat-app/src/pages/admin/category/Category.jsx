import CreateCategory from "./CreateCategory";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { IoIosAdd } from "react-icons/io";
import Table from "../../../components/ui/Table";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import ActionMenu from "../../../components/ui/ActionMenu";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import { useCategory } from "../../../hooks/admin/category/useCategory";
import ViewModal from "../../../components/ui/ViewModel";

const Category = () => {
  const {
  isDark,

  // Category data
  categoryData,
  filteredData,

  // Modal
  openCreateCategoryFormModal,
  setOpenCreateCategoryFormModal,

  // Selected category
  selectedCategoryId,
  setSelectedCategoryId,

  // View category
  viewCategory,
  setViewCategory,
  setOpenViewModel,
  openViewModel,

  // Search
  search,
  setSearch,

  // Filters
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,

  // Refresh category data
  fetchedCategory,

  // Category actions
  handleUpdateCategory,
  handleDeleteCategory,
  handleViewCategory,
} = useCategory();

  // TABLE COLUMNS
  const categoryColumns = [
    {
      key: "name",
      label: "Name",

      render: (row) => (
        <div className="flex items-center gap-3">
          {/* Avatar */}
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
            {row?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Name */}
          <p
            className={`
              max-w-[180px] truncate text-sm font-medium
              ${isDark ? "text-gray-200" : "text-gray-800"}
            `}
          >
            {row?.name || "Unknown Category"}
          </p>
        </div>
      ),
    },

    {
      key: "slug",
      label: "Slug",
    },

    {
      key: "description",
      label: "Description",
    },

    {
      key: "status",
      label: "Status",

      render: (row) => (row.status ? "Active" : "Inactive"),
    },

    {
      key: "createdAt",
      label: "Created At",

      render: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
    },

    {
      key: "actions",
      label: "",

      render: (row) => (
        <ActionMenu
          row={row}
          onView={handleViewCategory}
          onEdit={handleUpdateCategory}
          onDelete={handleDeleteCategory}
        />
      ),
    },
  ];

  // CATEGORY OPTIONS
  const categoryOptions = [
    {
      label: "All Categories",
      value: "",
    },

    ...categoryData.map((cat) => ({
      label: cat.name,
      value: cat.name,
    })),
  ];

  // STATUS OPTIONS
  const statusOptions = [
    {
      label: "All Status",
      value: "",
    },

    {
      label: "Active",
      value: "true",
    },

    {
      label: "Inactive",
      value: "false",
    },
  ];

  return (
    <div className={isDark ? "text-white" : "text-gray-900"}>
      {/* MAIN CARD */}
      <div
        className={`
          space-y-0
          rounded
          border
          shadow-sm
          mb-6
          ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
        `}
      >
        {/* HEADER */}
        <div
          className={`
            flex flex-col
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
              Categories
            </h1>

            <p
              className={`
                mt-1
                text-sm
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              View and manage all categories in your admin dashboard.
            </p>
          </div>

          {/* SEARCH + ADD */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-stretch
              sm:items-center
              gap-3
              w-full
              md:w-auto
            "
          >
            {/* SEARCH */}
            <div className="w-full sm:w-72">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* ADD CATEGORY */}
            <Button
              className="h-12 w-full sm:w-auto px-5"
              label="Add Category"
              variant={isDark ? "secondary" : "primary"}
              icon={<IoIosAdd className="text-xl" />}
              onClick={() => {
                // Clear selected category
                setSelectedCategoryId(null);

                // Open create category modal
                setOpenCreateCategoryFormModal(true);
              }}
            />
          </div>
        </div>

        {/* FILTER */}
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
          {/* CATEGORY FILTER */}
          <div className="w-full md:w-auto">
            <Dropdown
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categoryOptions}
            />
          </div>

          {/* STATUS FILTER */}
          <div className="w-full md:w-auto">
            <Dropdown
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={statusOptions}
            />
          </div>
        </div>
      </div>

      {/* STATISTICS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          mb-6
        "
      >
        {/* TOTAL */}
        <AdminPanelCard title="Total Categories" value={categoryData.length} />

        {/* ACTIVE */}
        <AdminPanelCard
          title="Active Categories"
          value={categoryData.filter((item) => item.status === true).length}
        />

        {/* INACTIVE */}
        <AdminPanelCard
          title="Inactive Categories"
          value={categoryData.filter((item) => item.status === false).length}
        />
      </div>

      {/* TABLE */}
      <Table columns={categoryColumns} data={filteredData} />

      {/* CREATE / EDIT CATEGORY MODAL */}
      {openCreateCategoryFormModal && (
        <Modal
          isOpen={openCreateCategoryFormModal}
          onClose={() => {
            // Close modal
            setOpenCreateCategoryFormModal(false);

            // Clear selected category
            setSelectedCategoryId(null);
          }}
          title={selectedCategoryId ? "Edit Category" : "Create Category"}
        >
          <CreateCategory
            categoryId={selectedCategoryId}
            onSuccess={() => {
              // Refresh category table
              fetchedCategory();

              // Close modal
              setOpenCreateCategoryFormModal(false);

              // Clear selected category
              setSelectedCategoryId(null);
            }}
          />
        </Modal>
      )}

     {openViewModel && (
  <ViewModal
    isOpen={openViewModel}
    onClose={() => {
      setOpenViewModel(false);
      setViewCategory(null);
    }}
    title="Category Details"
  >
    {viewCategory ? (
      <div className="space-y-5">

        {/* CATEGORY HEADER */}
        <div
          className={`
            flex items-center gap-4
            rounded-xl border p-4
            ${
              isDark
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            }
          `}
        >
          {/* Avatar */}
          <div
            className={`
              flex h-14 w-14 shrink-0
              items-center justify-center
              rounded-xl
              text-xl font-semibold uppercase
              ${
                isDark
                  ? "bg-white text-gray-900"
                  : "bg-gray-900 text-white"
              }
            `}
          >
            {viewCategory?.name?.charAt(0) || "C"}
          </div>

          <div className="min-w-0">
            <h3
              className={`
                truncate text-lg font-semibold
                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >
              {viewCategory?.name || "-"}
            </h3>

            <p
              className={`
                text-sm
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Category
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* NAME */}
          <div>
            <p
              className={`
                mb-1 text-xs font-medium uppercase
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Category Name
            </p>

            <p
              className={`
                text-sm font-medium
                ${isDark ? "text-gray-200" : "text-gray-800"}
              `}
            >
              {viewCategory?.name || "-"}
            </p>
          </div>

          {/* SLUG */}
          <div>
            <p
              className={`
                mb-1 text-xs font-medium uppercase
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Slug
            </p>

            <p
              className={`
                text-sm font-medium
                ${isDark ? "text-gray-200" : "text-gray-800"}
              `}
            >
              {viewCategory?.slug || "-"}
            </p>
          </div>

          {/* STATUS */}
          <div>
            <p
              className={`
                mb-1 text-xs font-medium uppercase
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Status
            </p>

            <span
              className={`
                inline-flex rounded-full px-3 py-1
                text-xs font-medium
                ${
                  viewCategory?.status
                    ? isDark
                      ? "bg-green-900/40 text-green-400"
                      : "bg-green-100 text-green-700"
                    : isDark
                    ? "bg-red-900/40 text-red-400"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {viewCategory?.status ? "Active" : "Inactive"}
            </span>
          </div>

          {/* CREATED DATE */}
          <div>
            <p
              className={`
                mb-1 text-xs font-medium uppercase
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Created At
            </p>

            <p
              className={`
                text-sm font-medium
                ${isDark ? "text-gray-200" : "text-gray-800"}
              `}
            >
              {viewCategory?.createdAt
                ? new Date(
                    viewCategory.createdAt
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <p
            className={`
              mb-2 text-xs font-medium uppercase
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Description
          </p>

          <div
            className={`
              rounded-lg border p-3
              ${
                isDark
                  ? "border-gray-700 bg-gray-800 text-gray-300"
                  : "border-gray-200 bg-gray-50 text-gray-700"
              }
            `}
          >
            <p className="text-sm leading-6">
              {viewCategory?.description || "No description available."}
            </p>
          </div>
        </div>

      </div>
    ) : (
      <div
        className={`
          py-8 text-center text-sm
          ${isDark ? "text-gray-400" : "text-gray-500"}
        `}
      >
        Category details not available.
      </div>
    )}
  </ViewModal>
)}
    </div>
  );
};

export default Category;
