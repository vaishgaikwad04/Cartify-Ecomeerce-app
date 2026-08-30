//resuable componments
import Button from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import Modal from "../../../components/ui/Modal";
import ActionMenu from "../../../components/ui/ActionMenu";

//icon
import { IoIosAdd } from "react-icons/io";

//create product page
import CreateProduct from "../product/CreateProduct";

///products custom hook
import { useProduct } from "../../../hooks/admin/product/useProduct";

const FetchProducts = () => {
  const {
    // Product data fetched from the API
    productsData,

    // Search value and function to update it
    search,
    setSearch,

    // Selected category and function to update it
    category,
    setCategory,

    // Category options used in the category dropdown
    categoryOptions,

    // Selected brand and function to update it
    brand,
    setBrand,

    // Selected product status and function to update it
    productStatus,
    setProductStatus,

    // Controls whether the create/edit product modal is open
    openCreateProductFormModal,
    setOpenCreateProductFormModal,

    // Stores the ID of the product being edited
    selectedProductId,
    setSelectedProductId,

    // Tells the component whether dark mode is active
    isDark,

    // Products after applying search and filters
    filteredProducts,

    // Opens the product form for editing
    handleUpdateProduct,

    // Deletes a product and updates the product list
    handleDeleteProduct,
  } = useProduct();

  // Main page background and default text color based on the current theme
  const pageBg = isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";

  // Card background and border color based on the current theme
  const cardBg = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  // Main heading text color based on the current theme
  const heading = isDark ? "text-white" : "text-gray-900";

  // Subheading text color based on the current theme
  const subHeading = isDark ? "text-gray-400" : "text-gray-500";

  ///brand options
  const brands = [
    { label: "All Brands", value: "" },
    { label: "Plum", value: "Plum" },
    { label: "Calvin Klein", value: "Calvin Klein" },
    { label: "Fossil", value: "Fossil" },
    { label: "Gucci", value: "Gucci" },
    { label: "L'Oréal", value: "LOreal" },
  ];

  //product status options
  const productStatusOptions = [
    { label: "All Status", value: "" },
    { label: "On Sale", value: "onSale" },
    { label: "Regular", value: "Regular" },
  ];

  ///product table column
  const productColumns = [
    {
      key: "image",
      label: "Product",
      render: (row) => (
        <div className="flex items-center gap-4">
          <img
            src={row.images?.[0]}
            alt={row.name}
            className={`w-16 h-16 rounded-lg object-cover border ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          />

          <div>
            <h3
              className={`font-semibold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {row.name}
            </h3>

            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {row.brand}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
      render: (row) => (
        <span
          className={`font-medium ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {row.category.charAt(0)?.toUpperCase() + row.category.slice(1)}
        </span>
      ),
    },

    {
      key: "price",
      label: "Price",
      render: (row) => (
        <span
          className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          ₹{row.price}
        </span>
      ),
    },

    {
      key: "discountPrice",
      label: "Discount Price",
      render: (row) => (
        <span className="font-semibold text-green-500">
          ₹{row.discountPrice}
        </span>
      ),
    },

    {
      key: "isOnSale",
      label: "Status",
      render: (row) =>
        row.isOnSale ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 isDark:bg-green-900/40 isDark:text-green-300">
            ● On Sale
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 isDark:bg-red-900/40 isDark:text-red-300">
            ● Regular
          </span>
        ),
    },

    {
      key: "brand",
      label: "Brand",
      render: (row) => (
        <span className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {row.brand}
        </span>
      ),
    },

    {
      key: "actions",
      label: "",
      render: (row) => (
        <ActionMenu
          row={row}
          onEdit={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />
      ),
    },
  ];

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${pageBg}`}>
      {/* Header */}
      <div className={`space-y-0 rounded shadow-sm border ${cardBg}`}>
        {/* Heading + search bar */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-5 border-b ${
            isDark ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <div>
            <h1 className={`text-2xl font-semibold ${heading}`}>Products</h1>

            <p className={`text-sm mt-1 ${subHeading}`}>
              View and manage all products in your admin dashboard.
            </p>
          </div>
          {/*SearchBar*/}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="w-full sm:w-72">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/*button to open modal*/}
            <Button
              className="h-12 w-full sm:w-auto px-5"
              label="Add Product"
              icon={<IoIosAdd className="text-xl" />}
              onClick={() => setOpenCreateProductFormModal(true)}
              variant={isDark ? "secondary" : "primary"}
            />
          </div>
        </div>

        {/* product Model */}
        <Modal
          isOpen={openCreateProductFormModal}
          onClose={() => {
            setOpenCreateProductFormModal(false);
            setSelectedProductId(null);
          }}
          className="h-[90vh]"
        >
          {/* pass product id for edit product */}
          <CreateProduct productId={selectedProductId} />
        </Modal>

        {/* Filters */}
        <div
          className={`flex flex-col md:flex-row md:items-end gap-5 p-5 ${
            isDark ? "border-t border-gray-700" : "border-t border-gray-100"
          }`}
        >
          {/*category dropdown */}
          <div className="w-full md:w-auto">
            <Dropdown
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
            />
          </div>

          {/*brand dropdown */}
          <div className="w-full md:w-auto">
            <Dropdown
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              options={brands}
            />
          </div>

          {/*status dropdown */}
          <div className="w-full md:w-auto">
            <Dropdown
              name="status"
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
              options={productStatusOptions}
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-8">
        <AdminPanelCard title="Total Products" value={productsData.length} />

        <AdminPanelCard
          title="On Sale"
          value={productsData.filter((item) => item.isOnSale).length}
        />

        <AdminPanelCard
          title="Brands"
          value={new Set(productsData.map((item) => item.brand)).size}
        />

        <AdminPanelCard
          title="Categories"
          value={new Set(productsData.map((item) => item.category)).size}
        />
      </div>

      {/*table*/}
      <Table data={filteredProducts} columns={productColumns} />
    </div>
  );
};

export default FetchProducts;
