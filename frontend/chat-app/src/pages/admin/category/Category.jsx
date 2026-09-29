//reusable button
import Button from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import ActionMenu from "../../../components/ui/ActionMenu";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
//add button icon
import { IoIosAdd } from "react-icons/io";
//resuable models
import Modal from "../../../components/ui/Modal";
import ViewModal from "../../../components/ui/ViewModel";
//create category page import
import CreateCategory from "./CreateCategory";
//category custom hook
import { useCategory } from "../../../hooks/admin/category/useCategory";

const Category = () => {
  const {
    isDark,

    // Category data
    categoryData,
    filteredData,

    // Modal
    openCreateCategoryFormModal,
    setOpenCreateCategoryFormModal,

    isOpenConfirmDeleteModel,
    setIsOpenConfirmDeleteModel,

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
          onDelete={(id) => {
            setSelectedCategoryId(id);
            setIsOpenConfirmDeleteModel(true);
          }}
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
          title={selectedCategoryId ? "Edit Category" : "Create Category"}
          isOpen={openCreateCategoryFormModal}
          onClose={() => {
            // Close modal
            setOpenCreateCategoryFormModal(false);
            // Clear selected category
            setSelectedCategoryId(null);
          }}
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
            <div
              className={`
          space-y-7
          ${isDark ? "text-white" : "text-gray-900"}
        `}
            >
              {/* =====================================================
            CATEGORY INTRO
        ====================================================== */}
              <div
                className={`
            border-b pb-6
            ${isDark ? "border-gray-800" : "border-gray-200"}
          `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {/* Small editorial label */}
                    <p
                      className={`
                  mb-2 text-[10px] font-medium uppercase
                  tracking-[0.25em]
                  ${isDark ? "text-gray-500" : "text-gray-400"}
                `}
                    >
                      Collection Category
                    </p>

                    {/* Category Name */}
                    <h2
                      className={`
                  truncate text-2xl font-medium tracking-tight
                  ${isDark ? "text-white" : "text-gray-950"}
                `}
                    >
                      {viewCategory?.name || "-"}
                    </h2>

                    {/* Slug */}
                    <p
                      className={`
                  mt-2 text-xs
                  ${isDark ? "text-gray-500" : "text-gray-400"}
                `}
                    >
                      /{viewCategory?.slug || "-"}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="shrink-0 pt-1">
                    <span
                      className={`
                  inline-flex items-center gap-2
                  text-[10px] font-medium uppercase
                  tracking-[0.16em]
                  ${
                    viewCategory?.status
                      ? isDark
                        ? "text-gray-300"
                        : "text-gray-700"
                      : isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                  }
                `}
                    >
                      <span
                        className={`
                    h-1.5 w-1.5 rounded-full
                    ${viewCategory?.status ? "bg-green-500" : "bg-gray-400"}
                  `}
                      />

                      {viewCategory?.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* =====================================================
            CATEGORY INFORMATION
        ====================================================== */}
              <div
                className={`
            grid grid-cols-1 gap-6
            sm:grid-cols-2
          `}
              >
                {/* CATEGORY NAME */}
                <div>
                  <p
                    className={`
                mb-2 text-[10px] font-medium uppercase
                tracking-[0.18em]
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
                  >
                    Category Name
                  </p>

                  <p
                    className={`
                text-sm
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
                mb-2 text-[10px] font-medium uppercase
                tracking-[0.18em]
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
                  >
                    Slug
                  </p>

                  <p
                    className={`
                break-all text-sm
                ${isDark ? "text-gray-300" : "text-gray-700"}
              `}
                  >
                    /{viewCategory?.slug || "-"}
                  </p>
                </div>

                {/* STATUS */}
                <div>
                  <p
                    className={`
                mb-2 text-[10px] font-medium uppercase
                tracking-[0.18em]
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
                  >
                    Status
                  </p>

                  <p
                    className={`
                text-sm
                ${
                  viewCategory?.status
                    ? isDark
                      ? "text-gray-200"
                      : "text-gray-800"
                    : isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                }
              `}
                  >
                    {viewCategory?.status ? "Active" : "Inactive"}
                  </p>
                </div>

                {/* CREATED DATE */}
                <div>
                  <p
                    className={`
                mb-2 text-[10px] font-medium uppercase
                tracking-[0.18em]
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
                  >
                    Created At
                  </p>

                  <p
                    className={`
                text-sm
                ${isDark ? "text-gray-300" : "text-gray-700"}
              `}
                  >
                    {viewCategory?.createdAt
                      ? new Date(viewCategory.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "-"}
                  </p>
                </div>
              </div>

              {/* =====================================================
            DESCRIPTION
        ====================================================== */}
              <div
                className={`
            border-t pt-6
            ${isDark ? "border-gray-800" : "border-gray-200"}
          `}
              >
                <p
                  className={`
              mb-3 text-[10px] font-medium uppercase
              tracking-[0.2em]
              ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
                >
                  About This Category
                </p>

                <p
                  className={`
              max-w-2xl text-sm leading-7
              ${isDark ? "text-gray-300" : "text-gray-600"}
            `}
                >
                  {viewCategory?.description || "No description available."}
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`
          py-10 text-center text-sm
          ${isDark ? "text-gray-500" : "text-gray-400"}
        `}
            >
              Category details not available.
            </div>
          )}
        </ViewModal>
      )}

      <Modal
        isOpen={isOpenConfirmDeleteModel}
        onClose={() => {
          setIsOpenConfirmDeleteModel(false);
          setSelectedCategoryId(null);
        }}
      >
        <div className="p-6 sm:p-7">
          {/* TITLE */}
          <div>
            <h2
              className={`text-lg font-semibold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Delete category?
            </h2>

            <p
              className={`mt-2 max-w-sm text-sm leading-6 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              This category will be permanently removed from your catalog. This
              action cannot be undone.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="mt-7 flex items-center justify-end gap-2">
            <Button
              label="Cancel"
              variant={isDark ? "secondary" : "outline"}
              onClick={() => {
                setIsOpenConfirmDeleteModel(false);
                setSelectedCategoryId(null);
              }}
            />

            <Button
              label="Delete"
              variant="danger"
              onClick={async () => {
                await handleDeleteCategory(selectedCategoryId);

                setIsOpenConfirmDeleteModel(false);
                setSelectedCategoryId(null);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
