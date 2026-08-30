import InputField from "../../../components/ui/InputField";
import Dropdown from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";
import CheckBox from "../../../components/ui/CheckBox";
import { useCreateProduct } from "../../../hooks/admin/product/useCreateProduct";

const CreateProduct = ({ productId }) => {
  const {
    // Dark mode status
    isDark,

    // Submit the product form
    handleSubmit,

    // Change product stock
    handleStockChange,

    // Change product size
    handleSizeChange,

    // Handle form input changes
    handleFormData,

    // Product form data
    formData,

    // Update form data
    setFormData,

    // Check if editing a product
    isEdit,

    // Set selected image files
    setFiles,

    // Category dropdown options
    categoryOptions,
  } = useCreateProduct({ productId });

  ///brand options
  const brands = [
    { label: "Plum", value: "Plum" },
    { label: "Calvin Klein", value: "Calvin Klein" },
    { label: "Fossil", value: "Fossil" },
    { label: "Gucci", value: "Gucci" },
    { label: "L'Oréal", value: "LOreal" },
    { label: "Generic", value: "Generic" },
  ];

  //sizes options
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    // Main page container
    // Changes background and text color according to the theme
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Page title */}
      {/* Changes between Create Product and Edit Product */}
      <h2
        className={`text-3xl font-semibold ml-6 p-6 border-b ${
          isDark
            ? "text-white border-gray-700"
            : "text-gray-900 border-gray-200"
        }`}
      >
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>

      {/* Form container */}
      <div className="min-h-screen p-6 flex justify-center">
        {/* Product form */}
        {/* handleSubmit runs when the form is submitted */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-5">
          {/* ================= BASIC INFO ================= */}
          <div
            className={`p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Basic Info</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Product name input */}
              <InputField
                type="text"
                name="name"
                value={formData.name}
                handleChange={handleFormData}
                label="Product Name"
              />

              {/* Product category dropdown */}
              <Dropdown
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleFormData}
                options={categoryOptions}
              />
            </div>
          </div>

          {/* ================= BRAND ================= */}
          <div
            className={`p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Brand</h2>

            {/* Brand dropdown */}
            <Dropdown
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleFormData}
              options={brands}
            />
          </div>

          {/* ================= PRICING ================= */}
          <div
            className={`p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Pricing</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Product price */}
              <InputField
                type="number"
                name="price"
                value={formData.price}
                handleChange={handleFormData}
                label="Price"
              />

              {/* Discounted price */}
              <InputField
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                handleChange={handleFormData}
                label="Discount Price"
              />
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div
            className={`p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Description</h2>

            {/* Product description */}
            <InputField
              type="text"
              name="description"
              value={formData.description}
              handleChange={handleFormData}
              label="Description"
            />

            {/* Product details */}
            <InputField
              type="text"
              name="details"
              value={formData.details}
              handleChange={handleFormData}
              label="Details"
            />

            {/* Product care information */}
            <InputField
              type="text"
              name="careFit"
              value={formData.careFit}
              handleChange={handleFormData}
              label="Care Fit"
            />
          </div>

          {/* ================= PRODUCT STATUS ================= */}
          <div
            className={`p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Product Status</h2>

            {/* Checkbox to mark product as on sale */}
            <CheckBox
              label="Is On Sale"
              checked={formData.isOnSale}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isOnSale: e.target.checked,
                })
              }
            />
          </div>

          {/* ================= VARIANTS ================= */}
          <div
            className={`p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Variants</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ================= SIZES ================= */}
              <div>
                <p className="text-sm mb-3 text-gray-500">Sizes</p>

                {/* Create a checkbox for every available size */}
                {sizes.map((size) => (
                  <CheckBox
                    key={size}
                    label={size}
                    // Check if this size already exists
                    // inside formData.variants
                    checked={formData.variants.some((v) => v.size === size)}
                    // Add or remove the size
                    // when checkbox changes
                    onChange={(e) => handleSizeChange(size, e.target.checked)}
                  />
                ))}
              </div>

              {/* ================= STOCK ================= */}
              <div>
                <p className="text-sm mb-3 text-gray-500">Stock</p>

                {/* Create a stock input for each selected size */}
                {formData.variants.map((item) => (
                  <InputField
                    key={item.size}
                    type="number"
                    value={item.stock}
                    // Update stock for the selected size
                    handleChange={(e) =>
                      handleStockChange(item.size, e.target.value)
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ================= IMAGES ================= */}
          <div
            className={`p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Images</h2>

            {/* Image file input */}
            <input
              type="file"
              // Allow selecting multiple images
              multiple
              // Store selected files in state
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className={`block w-full text-sm ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            />
          </div>

          {/* ================= SUBMIT BUTTON ================= */}

          {/* Button text changes depending on edit/create mode */}
          <Button
            label={isEdit ? "Update Product" : "Create Product"}
            // Makes this button submit the form
            type="submit"
            // Change button style according to theme
            variant={isDark ? "secondary" : "primary"}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
