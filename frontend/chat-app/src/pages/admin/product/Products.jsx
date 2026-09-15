//resuable componments
import Button from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import ActionMenu from "../../../components/ui/ActionMenu";
// reusable model
import Modal from "../../../components/ui/Modal";
import ViewModal from "../../../components/ui/ViewModel";
//icon
import { IoIosAdd } from "react-icons/io";
//create product page
import CreateProduct from "../product/CreateProduct";
///products custom hook
import { useProduct } from "../../../hooks/admin/product/useProduct";

const FetchProducts = () => {
  const {
    //theme
    isDark,
    //product data
    productsData,
    //search state
    search,
    setSearch,
    //category state
    category,
    setCategory,
    categoryOptions,
    //brand state
    brand,
    setBrand,
    //product state
    productStatus,
    setProductStatus,
    //model
    openCreateProductFormModal,
    setOpenCreateProductFormModal,
    openViewModel,
    setOpenViewModel,
    //state for store selected product id
    selectedProductId,
    setSelectedProductId,
    //state for store selected product
    selectedProduct,
    //filte product
    filteredProducts,

    //handler for CRUD
    handleUpdateProduct,
    handleDeleteProduct,
    handleViewProduct,
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
          onView={handleViewProduct}
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
            {/*button to open create product form model*/}
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
          <CreateProduct
            productId={selectedProductId}
            setProductFormModelIsOpen={setOpenCreateProductFormModal}
          />
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
          value={productsData.filter((item) => item.isOnSale).length} //Array → .length
        />

        <AdminPanelCard
          title="Brands"
          value={new Set(productsData.map((item) => item.brand)).size} //Set → .size
        />

        <AdminPanelCard
          title="Categories"
          value={new Set(productsData.map((item) => item.category)).size} //Set → .size
        />
      </div>

      <ViewModal
        isOpen={openViewModel}
        onClose={() => setOpenViewModel(false)}
        title="View Product"
      >
        {selectedProduct ? (
          <div className={`${isDark ? "text-white" : "text-gray-900"}`}>
            {/*PRODUCT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT : IMAGE */}
              <div>
                {/* Main Image */}
                <div
                  className={`rounded-2xl border overflow-hidden ${
                    isDark
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="aspect-square flex items-center justify-center p-6">
                    {selectedProduct.images?.[0] ? (
                      <img
                        src={selectedProduct.images[0]}
                        alt={selectedProduct.name}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <div
                        className={`flex items-center justify-center w-full h-full ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        No Image Available
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Thumbnails */}
                {selectedProduct.images?.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto">
                    {selectedProduct.images.map((image, index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 flex-shrink-0 rounded-lg border overflow-hidden ${
                          isDark
                            ? "border-gray-700 bg-gray-900"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name}-${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT : DETAILS*/}
              <div className="flex flex-col">
                {/* Brand */}
                <p
                  className={`text-sm font-medium mb-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {selectedProduct.brand || "Brand"}
                </p>

                {/* Product Name */}
                <h1
                  className={`text-2xl sm:text-3xl font-bold leading-tight ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedProduct.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-md text-sm font-medium">
                    <span>★</span>
                    <span>{selectedProduct.rating || "4.5"}</span>
                  </div>

                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Customer Rating
                  </span>
                </div>

                {/* Divider */}
                <div
                  className={`border-t my-5 ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                />

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-3xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ₹{selectedProduct.discountPrice || selectedProduct.price}
                  </span>

                  {selectedProduct.discountPrice &&
                    selectedProduct.price > selectedProduct.discountPrice && (
                      <>
                        <span
                          className={`text-lg line-through ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          ₹{selectedProduct.price}
                        </span>

                        <span className="text-sm font-semibold text-green-600">
                          {Math.round(
                            ((selectedProduct.price -
                              selectedProduct.discountPrice) /
                              selectedProduct.price) *
                              100,
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                </div>

                {/* Tax */}
                <p
                  className={`text-xs mt-2 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Inclusive of all taxes
                </p>

                {/* STATUS */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {/* Sale Status */}
                  {selectedProduct.isOnSale ? (
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        isDark
                          ? "bg-green-900/40 text-green-300"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      ● On Sale
                    </span>
                  ) : (
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      ● Regular
                    </span>
                  )}

                  {/* Stock */}
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      isDark
                        ? "bg-blue-900/40 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    ✓ Available
                  </span>
                </div>

                {/* PRODUCT META */}
                <div
                  className={`grid grid-cols-2 gap-3 mt-6 p-4 rounded-xl border ${
                    isDark
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Category
                    </p>

                    <p
                      className={`text-sm font-semibold mt-1 ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {selectedProduct.category || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Brand
                    </p>

                    <p
                      className={`text-sm font-semibold mt-1 ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {selectedProduct.brand || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Product ID
                    </p>

                    <p
                      className={`text-xs font-medium mt-1 truncate ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                      title={selectedProduct._id}
                    >
                      {selectedProduct._id || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Availability
                    </p>

                    <p className="text-sm font-semibold text-green-500 mt-1">
                      In Stock
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION*/}
            <div
              className={`border-t mt-8 pt-7 ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Product Description
              </h3>

              <p
                className={`text-sm leading-7 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {selectedProduct.description ||
                  "No description available for this product."}
              </p>
            </div>

            {/*  ADDITIONAL INFORMATION */}
            <div
              className={`border-t mt-7 pt-6 ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Additional Information
              </h3>

              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
                <div
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-gray-900" : "bg-gray-100"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Regular Price
                  </p>

                  <p className="font-semibold mt-1">
                    ₹{selectedProduct.price || 0}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-gray-900" : "bg-gray-100"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Selling Price
                  </p>

                  <p className="font-semibold text-green-500 mt-1">
                    ₹
                    {selectedProduct.discountPrice ||
                      selectedProduct.price ||
                      0}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-xl ${
                    isDark ? "bg-gray-900" : "bg-gray-100"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Sale Status
                  </p>

                  <p
                    className={`font-semibold mt-1 ${
                      selectedProduct.isOnSale
                        ? "text-green-500"
                        : isDark
                          ? "text-gray-300"
                          : "text-gray-700"
                    }`}
                  >
                    {selectedProduct.isOnSale ? "On Sale" : "Regular Price"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`py-16 text-center ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Product not found.
          </div>
        )}
      </ViewModal>

      {/*table*/}
      <Table data={filteredProducts} columns={productColumns} />
    </div>
  );
};

export default FetchProducts;
