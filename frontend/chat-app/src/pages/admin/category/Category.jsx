// //reusable button
// import Button from "../../../components/ui/Button";
// import Table from "../../../components/ui/Table";
// import SearchBar from "../../../components/ui/SearchBar";
// import Dropdown from "../../../components/ui/Dropdown";
// import ActionMenu from "../../../components/ui/ActionMenu";
// import AdminPanelCard from "../../../components/ui/AdminPanelCard";
// //add button icon
// import { IoIosAdd } from "react-icons/io";
// //resuable models
// import Modal from "../../../components/ui/Modal";
// import ViewModal from "../../../components/ui/ViewModel";
// //create category page import
// import CreateCategory from "./CreateCategory";
// //category custom hook
// import { useCategory } from "../../../hooks/admin/category/useCategory";

// const Category = () => {
//   const {
//     isDark,

//     // Category data
//     categoryData,
//     filteredData,

//     // Modal
//     openCreateCategoryFormModal,
//     setOpenCreateCategoryFormModal,

//     isOpenConfirmDeleteModel,
//     setIsOpenConfirmDeleteModel,

//     // Selected category
//     selectedCategoryId,
//     setSelectedCategoryId,

//     // View category
//     viewCategory,
//     setViewCategory,
//     setOpenViewModel,
//     openViewModel,

//     // Search
//     search,
//     setSearch,

//     // Filters
//     selectedCategory,
//     setSelectedCategory,
//     selectedStatus,
//     setSelectedStatus,

//     // Refresh category data
//     fetchedCategory,

//     // Category actions
//     handleUpdateCategory,
//     handleDeleteCategory,
//     handleViewCategory,
//   } = useCategory();

//   // TABLE COLUMNS
//   const categoryColumns = [
//     {
//       key: "name",
//       label: "Name",

//       render: (row) => (
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div
//             className={`
//               flex h-9 w-9 shrink-0 items-center justify-center
//               rounded-lg border text-sm font-semibold uppercase
//               ${
//                 isDark
//                   ? "border-gray-200 bg-white text-black"
//                   : "border-gray-200 bg-gray-100 text-gray-700"
//               }
//             `}
//           >
//             {row?.name?.charAt(0)?.toUpperCase() || "U"}
//           </div>

//           {/* Name */}
//           <p
//             className={`
//               max-w-[180px] truncate text-sm font-medium
//               ${isDark ? "text-gray-200" : "text-gray-800"}
//             `}
//           >
//             {row?.name || "Unknown Category"}
//           </p>
//         </div>
//       ),
//     },

//     {
//       key: "slug",
//       label: "Slug",
//     },

//     {
//       key: "description",
//       label: "Description",
//     },

//     {
//       key: "status",
//       label: "Status",

//       render: (row) => (row.status ? "Active" : "Inactive"),
//     },

//     {
//       key: "createdAt",
//       label: "Created At",

//       render: (row) =>
//         row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
//     },

//     {
//       key: "actions",
//       label: "",

//       render: (row) => (
//         <ActionMenu
//           row={row}
//           onView={handleViewCategory}
//           onEdit={handleUpdateCategory}
//           onDelete={(id) => {
//             setSelectedCategoryId(id);
//             setIsOpenConfirmDeleteModel(true);
//           }}
//         />
//       ),
//     },
//   ];

//   // CATEGORY OPTIONS
//   const categoryOptions = [
//     {
//       label: "All Categories",
//       value: "",
//     },

//     ...categoryData.map((cat) => ({
//       label: cat.name,
//       value: cat.name,
//     })),
//   ];

//   // STATUS OPTIONS
//   const statusOptions = [
//     {
//       label: "All Status",
//       value: "",
//     },

//     {
//       label: "Active",
//       value: "true",
//     },

//     {
//       label: "Inactive",
//       value: "false",
//     },
//   ];

//   return (
//     <div className={isDark ? "text-white" : "text-gray-900"}>
//       {/* MAIN CARD */}
//       <div
//         className={`
//           space-y-0
//           rounded
//           border
//           shadow-sm
//           mb-6
//           ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
//         `}
//       >
//         {/* HEADER */}
//         <div
//           className={`
//             flex flex-col
//             md:flex-row
//             md:items-center
//             md:justify-between
//             gap-5
//             p-5
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-100"
//             }
//           `}
//         >
//           <div>
//             <h1
//               className={`
//                 text-2xl
//                 font-semibold
//                 ${isDark ? "text-white" : "text-gray-900"}
//               `}
//             >
//               Categories
//             </h1>

//             <p
//               className={`
//                 mt-1
//                 text-sm
//                 ${isDark ? "text-gray-400" : "text-gray-500"}
//               `}
//             >
//               View and manage all categories in your admin dashboard.
//             </p>
//           </div>

//           {/* SEARCH + ADD */}
//           <div
//             className="
//               flex
//               flex-col
//               sm:flex-row
//               items-stretch
//               sm:items-center
//               gap-3
//               w-full
//               md:w-auto
//             "
//           >
//             {/* SEARCH */}
//             <div className="w-full sm:w-72">
//               <SearchBar
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             {/* ADD CATEGORY */}
//             <Button
//               className="h-12 w-full sm:w-auto px-5"
//               label="Add Category"
//               variant={isDark ? "secondary" : "primary"}
//               icon={<IoIosAdd className="text-xl" />}
//               onClick={() => {
//                 // Clear selected category
//                 setSelectedCategoryId(null);

//                 // Open create category modal
//                 setOpenCreateCategoryFormModal(true);
//               }}
//             />
//           </div>
//         </div>

//         {/* FILTER */}
//         <div
//           className={`
//             flex
//             flex-col
//             md:flex-row
//             md:items-end
//             gap-5
//             p-5
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-100"
//             }
//           `}
//         >
//           {/* CATEGORY FILTER */}
//           <div className="w-full md:w-auto">
//             <Dropdown
//               name="category"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               options={categoryOptions}
//             />
//           </div>

//           {/* STATUS FILTER */}
//           <div className="w-full md:w-auto">
//             <Dropdown
//               name="status"
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               options={statusOptions}
//             />
//           </div>
//         </div>
//       </div>

//       {/* STATISTICS */}
//       <div
//         className="
//           grid
//           grid-cols-1
//           sm:grid-cols-2
//           lg:grid-cols-3
//           gap-5
//           mb-6
//         "
//       >
//         {/* TOTAL */}
//         <AdminPanelCard title="Total Categories" value={categoryData.length} />

//         {/* ACTIVE */}
//         <AdminPanelCard
//           title="Active Categories"
//           value={categoryData.filter((item) => item.status === true).length}
//         />

//         {/* INACTIVE */}
//         <AdminPanelCard
//           title="Inactive Categories"
//           value={categoryData.filter((item) => item.status === false).length}
//         />
//       </div>

//       {/* TABLE */}
//       <Table columns={categoryColumns} data={filteredData} />

//       {/* CREATE / EDIT CATEGORY MODAL */}
//       {openCreateCategoryFormModal && (
//         <Modal
//           title={selectedCategoryId ? "Edit Category" : "Create Category"}
//           isOpen={openCreateCategoryFormModal}
//           onClose={() => {
//             // Close modal
//             setOpenCreateCategoryFormModal(false);
//             // Clear selected category
//             setSelectedCategoryId(null);
//           }}
//         >
//           <CreateCategory
//             categoryId={selectedCategoryId}
//             onSuccess={() => {
//               // Refresh category table
//               fetchedCategory();
//               // Close modal
//               setOpenCreateCategoryFormModal(false);
//               // Clear selected category
//               setSelectedCategoryId(null);
//             }}
//           />
//         </Modal>
//       )}

//       {openViewModel && (
//         <ViewModal
//           isOpen={openViewModel}
//           onClose={() => {
//             setOpenViewModel(false);
//             setViewCategory(null);
//           }}
//           title="Category Details"
//         >
//           {viewCategory ? (
//             <div
//               className={`
//           space-y-7
//           ${isDark ? "text-white" : "text-gray-900"}
//         `}
//             >
//               {/* =====================================================
//             CATEGORY INTRO
//         ====================================================== */}
//               <div
//                 className={`
//             border-b pb-6
//             ${isDark ? "border-gray-800" : "border-gray-200"}
//           `}
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="min-w-0">
//                     {/* Small editorial label */}
//                     <p
//                       className={`
//                   mb-2 text-[10px] font-medium uppercase
//                   tracking-[0.25em]
//                   ${isDark ? "text-gray-500" : "text-gray-400"}
//                 `}
//                     >
//                       Collection Category
//                     </p>

//                     {/* Category Name */}
//                     <h2
//                       className={`
//                   truncate text-2xl font-medium tracking-tight
//                   ${isDark ? "text-white" : "text-gray-950"}
//                 `}
//                     >
//                       {viewCategory?.name || "-"}
//                     </h2>

//                     {/* Slug */}
//                     <p
//                       className={`
//                   mt-2 text-xs
//                   ${isDark ? "text-gray-500" : "text-gray-400"}
//                 `}
//                     >
//                       /{viewCategory?.slug || "-"}
//                     </p>
//                   </div>

//                   {/* Status */}
//                   <div className="shrink-0 pt-1">
//                     <span
//                       className={`
//                   inline-flex items-center gap-2
//                   text-[10px] font-medium uppercase
//                   tracking-[0.16em]
//                   ${
//                     viewCategory?.status
//                       ? isDark
//                         ? "text-gray-300"
//                         : "text-gray-700"
//                       : isDark
//                         ? "text-gray-500"
//                         : "text-gray-400"
//                   }
//                 `}
//                     >
//                       <span
//                         className={`
//                     h-1.5 w-1.5 rounded-full
//                     ${viewCategory?.status ? "bg-green-500" : "bg-gray-400"}
//                   `}
//                       />

//                       {viewCategory?.status ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* =====================================================
//             CATEGORY INFORMATION
//         ====================================================== */}
//               <div
//                 className={`
//             grid grid-cols-1 gap-6
//             sm:grid-cols-2
//           `}
//               >
//                 {/* CATEGORY NAME */}
//                 <div>
//                   <p
//                     className={`
//                 mb-2 text-[10px] font-medium uppercase
//                 tracking-[0.18em]
//                 ${isDark ? "text-gray-500" : "text-gray-400"}
//               `}
//                   >
//                     Category Name
//                   </p>

//                   <p
//                     className={`
//                 text-sm
//                 ${isDark ? "text-gray-200" : "text-gray-800"}
//               `}
//                   >
//                     {viewCategory?.name || "-"}
//                   </p>
//                 </div>

//                 {/* SLUG */}
//                 <div>
//                   <p
//                     className={`
//                 mb-2 text-[10px] font-medium uppercase
//                 tracking-[0.18em]
//                 ${isDark ? "text-gray-500" : "text-gray-400"}
//               `}
//                   >
//                     Slug
//                   </p>

//                   <p
//                     className={`
//                 break-all text-sm
//                 ${isDark ? "text-gray-300" : "text-gray-700"}
//               `}
//                   >
//                     /{viewCategory?.slug || "-"}
//                   </p>
//                 </div>

//                 {/* STATUS */}
//                 <div>
//                   <p
//                     className={`
//                 mb-2 text-[10px] font-medium uppercase
//                 tracking-[0.18em]
//                 ${isDark ? "text-gray-500" : "text-gray-400"}
//               `}
//                   >
//                     Status
//                   </p>

//                   <p
//                     className={`
//                 text-sm
//                 ${
//                   viewCategory?.status
//                     ? isDark
//                       ? "text-gray-200"
//                       : "text-gray-800"
//                     : isDark
//                       ? "text-gray-500"
//                       : "text-gray-400"
//                 }
//               `}
//                   >
//                     {viewCategory?.status ? "Active" : "Inactive"}
//                   </p>
//                 </div>

//                 {/* CREATED DATE */}
//                 <div>
//                   <p
//                     className={`
//                 mb-2 text-[10px] font-medium uppercase
//                 tracking-[0.18em]
//                 ${isDark ? "text-gray-500" : "text-gray-400"}
//               `}
//                   >
//                     Created At
//                   </p>

//                   <p
//                     className={`
//                 text-sm
//                 ${isDark ? "text-gray-300" : "text-gray-700"}
//               `}
//                   >
//                     {viewCategory?.createdAt
//                       ? new Date(viewCategory.createdAt).toLocaleDateString(
//                           "en-GB",
//                           {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           },
//                         )
//                       : "-"}
//                   </p>
//                 </div>
//               </div>

//               {/* =====================================================
//             DESCRIPTION
//         ====================================================== */}
//               <div
//                 className={`
//             border-t pt-6
//             ${isDark ? "border-gray-800" : "border-gray-200"}
//           `}
//               >
//                 <p
//                   className={`
//               mb-3 text-[10px] font-medium uppercase
//               tracking-[0.2em]
//               ${isDark ? "text-gray-500" : "text-gray-400"}
//             `}
//                 >
//                   About This Category
//                 </p>

//                 <p
//                   className={`
//               max-w-2xl text-sm leading-7
//               ${isDark ? "text-gray-300" : "text-gray-600"}
//             `}
//                 >
//                   {viewCategory?.description || "No description available."}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div
//               className={`
//           py-10 text-center text-sm
//           ${isDark ? "text-gray-500" : "text-gray-400"}
//         `}
//             >
//               Category details not available.
//             </div>
//           )}
//         </ViewModal>
//       )}

//       <Modal
//         isOpen={isOpenConfirmDeleteModel}
//         onClose={() => {
//           setIsOpenConfirmDeleteModel(false);
//           setSelectedCategoryId(null);
//         }}
//       >
//         <div className="p-6 sm:p-7">
//           {/* TITLE */}
//           <div>
//             <h2
//               className={`text-lg font-semibold tracking-tight ${
//                 isDark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Delete category?
//             </h2>

//             <p
//               className={`mt-2 max-w-sm text-sm leading-6 ${
//                 isDark ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               This category will be permanently removed from your catalog. This
//               action cannot be undone.
//             </p>
//           </div>

//           {/* ACTIONS */}
//           <div className="mt-7 flex items-center justify-end gap-2">
//             <Button
//               label="Cancel"
//               variant={isDark ? "secondary" : "outline"}
//               onClick={() => {
//                 setIsOpenConfirmDeleteModel(false);
//                 setSelectedCategoryId(null);
//               }}
//             />

//             <Button
//               label="Delete"
//               variant="danger"
//               onClick={async () => {
//                 await handleDeleteCategory(selectedCategoryId);

//                 setIsOpenConfirmDeleteModel(false);
//                 setSelectedCategoryId(null);
//               }}
//             />
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Category;

import { useMemo, useState } from "react";
import { IoIosAdd } from "react-icons/io";

import Button from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import ActionMenu from "../../../components/ui/ActionMenu";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import Modal from "../../../components/ui/Modal";
import ViewModal from "../../../components/ui/ViewModel";
import CreateCategory from "./CreateCategory";
import { useCategory } from "../../../hooks/admin/category/useCategory";

const Category = () => {
  const {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [openCreateCategoryFormModal, setOpenCreateCategoryFormModal] =
    useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const categoryList = categories || [];

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    ...categoryList.map((category) => ({
      label: category.name,
      value: category._id,
    })),
  ];

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const filteredData = useMemo(() => {
    return categoryList.filter((category) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        category.name?.toLowerCase().includes(searchText) ||
        category.slug?.toLowerCase().includes(searchText) ||
        category.description?.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        category._id === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" ||
        String(category.status).toLowerCase() === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [categoryList, search, selectedCategory, selectedStatus]);

  const activeCount = categoryList.filter(
    (category) => String(category.status).toLowerCase() === "active"
  ).length;

  const inactiveCount = categoryList.length - activeCount;

  const handleCreateCategory = async (formData) => {
    await createCategory(formData);
    setOpenCreateCategoryFormModal(false);
    setSelectedCategoryId(null);
  };

  const handleUpdateCategory = async (formData) => {
    if (!selectedCategoryId) return;

    await updateCategory(selectedCategoryId, formData);
    setOpenCreateCategoryFormModal(false);
    setSelectedCategoryId(null);
  };

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId) return;

    await deleteCategory(deleteCategoryId);
    setDeleteCategoryId(null);
  };

  const categoryColumns = [
    {
      header: "Category",
      accessor: "name",
      render: (category) => (
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            {category.name?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semimedium text-gray-800 dark:text-gray-100">
              {category.name || "Untitled"}
            </p>
            <p className="truncate text-[11px] text-gray-500">
              {category.slug || "No slug"}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      render: (category) => (
        <p
          className="max-w-[180px] truncate text-xs text-gray-600 dark:text-gray-300"
          title={category.description || ""}
        >
          {category.description || "—"}
        </p>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (category) => {
        const isActive =
          String(category.status).toLowerCase() === "active";

        return (
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
              isActive
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {category.status || "Inactive"}
          </span>
        );
      },
    },
    {
      header: "Created",
      accessor: "createdAt",
      render: (category) => (
        <span className="whitespace-nowrap text-xs text-gray-500">
          {category.createdAt
            ? new Date(category.createdAt).toLocaleDateString()
            : "—"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (category) => (
        <ActionMenu
          onView={() => setViewCategory(category)}
          onEdit={() => {
            setSelectedCategoryId(category._id);
            setOpenCreateCategoryFormModal(true);
          }}
          onDelete={() => setDeleteCategoryId(category._id)}
        />
      ),
    },
  ];

  const editingCategory = categoryList.find(
    (category) => category._id === selectedCategoryId
  );

  return (
    <div className="w-full min-w-0 space-y-4 overflow-x-hidden">
      {/* Header and filters */}
      <section className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex min-w-0 flex-col gap-3 border-b border-gray-100 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              Categories
            </h1>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Manage and organize your product categories.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
            <div className="min-w-0 sm:w-52">
              <SearchBar
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <Button
              className="h-8 w-full px-3 text-sm sm:w-auto"
              label="Add Category"
              variant="primary"
              icon={<IoIosAdd className="text-lg" />}
              onClick={() => {
                setSelectedCategoryId(null);
                setOpenCreateCategoryFormModal(true);
              }}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 p-3 sm:flex-row sm:items-center">
          <div className="min-w-0 sm:w-52">
            <Dropdown
              name="category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              options={categoryOptions}
            />
          </div>

          <div className="min-w-0 sm:w-44">
            <Dropdown
              name="status"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              options={statusOptions}
            />
          </div>

          {(search ||
            selectedCategory !== "all" ||
            selectedStatus !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="self-start whitespace-nowrap rounded-md px-2 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 sm:self-auto dark:hover:bg-gray-800"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
        <AdminPanelCard
          title="Total Categories"
          value={categoryList.length}
        />
        <AdminPanelCard
          title="Active Categories"
          value={activeCount}
        />
        <AdminPanelCard
          title="Inactive Categories"
          value={inactiveCount}
        />
      </section>

      {/* Category table */}
      <section className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-3 py-2.5 dark:border-gray-700">
          <div>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
              Category List
            </h2>
            <p className="mt-0.5 text-[11px] text-gray-500">
              {filteredData.length}{" "}
              {filteredData.length === 1 ? "category" : "categories"} found
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 overflow-x-auto">
          <Table columns={categoryColumns} data={filteredData} />
        </div>
      </section>

      {/* Create / Edit modal */}
      <Modal
        isOpen={openCreateCategoryFormModal}
        onClose={() => {
          setOpenCreateCategoryFormModal(false);
          setSelectedCategoryId(null);
        }}
        title={selectedCategoryId ? "Edit Category" : "Add Category"}
      >
        <CreateCategory
          initialData={editingCategory}
          onSubmit={
            selectedCategoryId
              ? handleUpdateCategory
              : handleCreateCategory
          }
          onCancel={() => {
            setOpenCreateCategoryFormModal(false);
            setSelectedCategoryId(null);
          }}
        />
      </Modal>

      {/* View modal */}
      <ViewModal
        isOpen={Boolean(viewCategory)}
        onClose={() => setViewCategory(null)}
        title="Category Details"
      >
        {viewCategory && (
          <div className="max-w-full space-y-4 p-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                {viewCategory.name?.charAt(0)?.toUpperCase() || "C"}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                  {viewCategory.name}
                </h3>
                <p className="truncate text-xs text-gray-500">
                  {viewCategory.slug || "No slug"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="min-w-0 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                <p className="text-[11px] text-gray-500">Status</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                  {viewCategory.status || "Inactive"}
                </p>
              </div>

              <div className="min-w-0 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                <p className="text-[11px] text-gray-500">Created</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                  {viewCategory.createdAt
                    ? new Date(viewCategory.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">
                Description
              </p>
              <p className="break-words text-sm leading-5 text-gray-700 dark:text-gray-300">
                {viewCategory.description || "No description provided."}
              </p>
            </div>
          </div>
        )}
      </ViewModal>

      {/* Delete confirmation */}
      <Modal
        isOpen={Boolean(deleteCategoryId)}
        onClose={() => setDeleteCategoryId(null)}
        title="Delete Category"
      >
        <div className="max-w-full p-4">
          <p className="text-sm leading-5 text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this category? This action cannot
            be undone.
          </p>

          <div className="mt-5 flex flex-col-reverse justify-end gap-2 sm:flex-row">
            <Button
              label="Cancel"
              variant="secondary"
              className="w-full text-sm sm:w-auto"
              onClick={() => setDeleteCategoryId(null)}
            />

            <Button
              label="Delete"
              variant="danger"
              className="w-full text-sm sm:w-auto"
              onClick={handleDeleteCategory}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
