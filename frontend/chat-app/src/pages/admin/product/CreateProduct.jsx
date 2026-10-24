// import InputField from "../../../components/ui/InputField";
// import Dropdown from "../../../components/ui/Dropdown";
// import Button from "../../../components/ui/Button";
// import CheckBox from "../../../components/ui/CheckBox";
// import { useCreateProduct } from "../../../hooks/admin/product/useCreateProduct";
// import { FiPackage, FiEdit3 } from "react-icons/fi";

// const CreateProduct = ({ productId, setProductFormModelIsOpen }) => {
//   const {
//     // Dark mode
//     isDark,

//     // Submit
//     handleSubmit,

//     // Stock
//     handleStockChange,

//     // Size
//     handleSizeChange,

//     // Form changes
//     handleFormData,

//     // Form data
//     formData,

//     // Set form data
//     setFormData,

//     // Edit mode
//     isEdit,

//     // Image files
//     setFiles,

//     // Categories
//     categoryOptions,
//   } = useCreateProduct({
//     productId,
//     setProductFormModelIsOpen,
//   });

//   // Brand options
//   const brands = [
//     { label: "Plum", value: "Plum" },
//     { label: "Calvin Klein", value: "Calvin Klein" },
//     { label: "Fossil", value: "Fossil" },
//     { label: "Gucci", value: "Gucci" },
//     { label: "L'Oréal", value: "LOreal" },
//     { label: "Generic", value: "Generic" },
//   ];

//   // Available sizes
//   const sizes = ["S", "M", "L", "XL", "XXL"];

//   return (
//     <div
//       className={`
//         w-full
//         ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}
//       `}
//     >
//       {/* =====================================================
//           FORM
//       ====================================================== */}

//       <form onSubmit={handleSubmit} className="w-full space-y-5">
//         {/* =====================================================
//             BASIC INFORMATION
//         ====================================================== */}
//         <div className="mb-4 py-4">
//           <div className="flex items-start gap-3">
//             {/* Product Icon */}
//             <div
//               className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border mt-2 ${
//                 isDark
//                   ? "border-gray-700 bg-gray-800/70 text-gray-200"
//                   : "border-gray-200 bg-gray-50 text-gray-700"
//               }`}
//             >
//               {isEdit ? (
//                 <FiEdit3 className="text-xl" />
//               ) : (
//                 <FiPackage className="text-xl" />
//               )}
//             </div>

//             {/* Heading Content */}
//             <div>
//               <h1
//                 className={`text-2xl font-semibold tracking-tight ${
//                   isDark ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 {isEdit ? "Edit Product" : "Create Product"}
//               </h1>

//               <p
//                 className={`mt-1 text-sm leading-6 ${
//                   isDark ? "text-gray-400" : "text-gray-500"
//                 }`}
//               >
//                 {isEdit
//                   ? "Update the product information, pricing, variants, and images."
//                   : "Add a new product to your catalog with its details, pricing, variants, and images."}
//               </p>
//             </div>
//           </div>
//         </div>
//         <section
//           className={`
//             p-5
//             sm:p-6
//             rounded-xl
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200"
//             }
//           `}
//         >
//           <h2 className="text-lg font-semibold mb-5">Basic Info</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Product Name */}
//             <InputField
//               type="text"
//               name="name"
//               value={formData.name}
//               handleChange={handleFormData}
//               label="Product Name"
//             />

//             {/* Category */}
//             <Dropdown
//               label="Category"
//               name="category"
//               value={formData.category}
//               onChange={handleFormData}
//               options={categoryOptions}
//             />
//           </div>
//         </section>

//         {/* =====================================================
//             BRAND
//         ====================================================== */}

//         <section
//           className={`
//             p-5
//             sm:p-6
//             rounded-xl
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200"
//             }
//           `}
//         >
//           <h2 className="text-lg font-semibold mb-5">Brand</h2>

//           <Dropdown
//             label="Brand"
//             name="brand"
//             value={formData.brand}
//             onChange={handleFormData}
//             options={brands}
//           />
//         </section>

//         {/* =====================================================
//             PRICING
//         ====================================================== */}

//         <section
//           className={`
//             p-5
//             sm:p-6
//             rounded-xl
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200"
//             }
//           `}
//         >
//           <h2 className="text-lg font-semibold mb-5">Pricing</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <InputField
//               type="number"
//               name="price"
//               value={formData.price}
//               handleChange={handleFormData}
//               label="Price"
//               min={0}
//             />

//             <InputField
//               type="number"
//               name="discountPrice"
//               value={formData.discountPrice}
//               handleChange={handleFormData}
//               label="Discount Price"
//               min={0}
//             />
//           </div>
//         </section>

//         {/* =====================================================
//             DESCRIPTION
//         ====================================================== */}

//         <section
//           className={`
//             p-5
//             sm:p-6
//             rounded-xl
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200"
//             }
//           `}
//         >
//           <h2 className="text-lg font-semibold mb-5">Description</h2>

//           <div className="space-y-4">
//             <InputField
//               type="text"
//               name="description"
//               value={formData.description}
//               handleChange={handleFormData}
//               label="Description"
//             />

//             <InputField
//               type="text"
//               name="details"
//               value={formData.details}
//               handleChange={handleFormData}
//               label="Details"
//             />

//             <InputField
//               type="text"
//               name="careFit"
//               value={formData.careFit}
//               handleChange={handleFormData}
//               label="Care Fit"
//             />
//           </div>
//         </section>

//         {/* =====================================================
//             PRODUCT STATUS
//         ====================================================== */}

//         <section
//           className={`
//             p-5
//             sm:p-6
//             rounded-xl
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200"
//             }
//           `}
//         >
//           <h2 className="text-lg font-semibold mb-5">Product Status</h2>

//           <CheckBox
//             label="Is On Sale"
//             name="isOnSale"
//             checked={formData.isOnSale}
//             onChange={handleFormData}
//           />
//         </section>

//         {/* =====================================================
//             VARIANTS
//         ====================================================== */}

//         {/* Variants */}
//         <section
//           className={`h-[320px] flex-shrink-0 p-5 sm:p-6 rounded-xl border ${
//             isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//           }`}
//         >
//           {/* Header */}
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold">Variants</h2>

//             <p
//               className={`text-xs mt-1 ${
//                 isDark ? "text-gray-500" : "text-gray-400"
//               }`}
//             >
//               Select available sizes and set their stock
//             </p>
//           </div>

//           {/* Fixed content area */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[220px]">
//             {/* ================= SIZES ================= */}
//             <div className="h-full min-h-0">
//               <p
//                 className={`text-xs font-medium uppercase tracking-wider mb-2 ${
//                   isDark ? "text-gray-400" : "text-gray-500"
//                 }`}
//               >
//                 Available Sizes
//               </p>

//               <div
//                 className={`h-[190px] rounded-lg border p-2 ${
//                   isDark
//                     ? "border-gray-700 bg-gray-900"
//                     : "border-gray-200 bg-gray-50"
//                 }`}
//               >
//                 {sizes.map((size) => {
//                   const isSelected = formData.variants.some(
//                     (variant) => variant.size === size,
//                   );

//                   return (
//                     <div
//                       key={size}
//                       className={`h-9 flex items-center px-3 rounded-md ${
//                         isDark ? "hover:bg-gray-800" : "hover:bg-white"
//                       }`}
//                     >
//                       <CheckBox
//                         label={size}
//                         checked={isSelected}
//                         onChange={(e) =>
//                           handleSizeChange(size, e.target.checked)
//                         }
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* ================= STOCK ================= */}
//             <div className="h-full min-h-0">
//               <p
//                 className={`text-xs font-medium uppercase tracking-wider mb-2 ${
//                   isDark ? "text-gray-400" : "text-gray-500"
//                 }`}
//               >
//                 Stock
//               </p>

//               <div
//                 className={`h-[190px] rounded-lg border p-2 ${
//                   isDark
//                     ? "border-gray-700 bg-gray-900"
//                     : "border-gray-200 bg-gray-50"
//                 }`}
//               >
//                 {sizes.map((size) => {
//                   const variant = formData.variants.find(
//                     (item) => item.size === size,
//                   );

//                   return (
//                     <div
//                       key={size}
//                       className="h-9 flex items-center gap-3 px-2"
//                     >
//                       {/* Size */}
//                       <div
//                         className={`w-9 h-7 flex-shrink-0 flex items-center justify-center rounded-md text-xs font-semibold ${
//                           isDark
//                             ? "bg-gray-800 text-gray-200"
//                             : "bg-white text-gray-700 border border-gray-200"
//                         }`}
//                       >
//                         {size}
//                       </div>

//                       {/* Fixed stock slot */}
//                       <div className="flex-1 h-7">
//                         {variant ? (
//                           <input
//                             type="number"
//                             min="0"
//                             value={variant.stock}
//                             onChange={(e) =>
//                               handleStockChange(size, e.target.value)
//                             }
//                             className={`w-full h-7 px-2 rounded-md border text-xs outline-none ${
//                               isDark
//                                 ? "bg-gray-800 border-gray-700 text-white"
//                                 : "bg-white border-gray-200 text-gray-900"
//                             }`}
//                           />
//                         ) : (
//                           <div
//                             className={`w-full h-7 flex items-center px-2 rounded-md border text-xs ${
//                               isDark
//                                 ? "bg-gray-800 border-gray-800 text-gray-600"
//                                 : "bg-gray-100 border-gray-200 text-gray-400"
//                             }`}
//                           >
//                             —
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* =====================================================
//             IMAGES
//         ====================================================== */}

//         <section
//           className={`
//             p-5
//             sm:p-6
//             rounded-xl
//             border
//             ${
//               isDark
//                 ? "bg-gray-800 border-gray-700"
//                 : "bg-white border-gray-200"
//             }
//           `}
//         >
//           <h2 className="text-lg font-semibold mb-5">Images</h2>

//           <input
//             type="file"
//             multiple
//             onChange={(e) => setFiles(Array.from(e.target.files))}
//             className={`
//               block
//               w-full
//               text-sm
//               file:mr-4
//               file:py-2
//               file:px-4
//               file:rounded-lg
//               file:border-0
//               file:text-sm
//               file:font-medium
//               ${
//                 isDark
//                   ? "text-gray-400 file:bg-gray-700 file:text-gray-200"
//                   : "text-gray-600 file:bg-gray-100 file:text-gray-700"
//               }
//             `}
//           />
//         </section>

//         {/* =====================================================
//             SUBMIT
//         ====================================================== */}

//         <div
//           className={`
//             flex
//             justify-end
//             pt-2
//             pb-1
//           `}
//         >
//           <Button
//             label={isEdit ? "Update Product" : "Create Product"}
//             type="submit"
//             variant={isDark ? "secondary" : "primary"}
//             className="
//               w-full
//               sm:w-auto
//               sm:min-w-[180px]
//             "
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;

import InputField from "../../../components/ui/InputField";
import Dropdown from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";
import CheckBox from "../../../components/ui/CheckBox";
import { useCreateProduct } from "../../../hooks/admin/product/useCreateProduct";
import { FiPackage, FiEdit3, FiImage } from "react-icons/fi";

const CreateProduct = ({ productId, setProductFormModelIsOpen }) => {
  const {
    isDark,
    handleSubmit,
    handleStockChange,
    handleSizeChange,
    handleFormData,
    formData,
    setFiles,
    isEdit,
    categoryOptions,
  } = useCreateProduct({ productId, setProductFormModelIsOpen });

  const brands = [
    { label: "Plum", value: "Plum" },
    { label: "Calvin Klein", value: "Calvin Klein" },
    { label: "Fossil", value: "Fossil" },
    { label: "Gucci", value: "Gucci" },
    { label: "L'Oréal", value: "LOreal" },
    { label: "Generic", value: "Generic" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const variants = formData.variants || [];

  const sectionClass = `rounded-xl border p-4 sm:p-5 ${
    isDark
      ? "border-gray-700 bg-gray-800"
      : "border-gray-200 bg-white"
  }`;

  const headingClass = `text-sm font-semibold ${
    isDark ? "text-white" : "text-gray-900"
  }`;

  const mutedClass = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`w-full ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 pb-1">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
              isDark
                ? "border-gray-700 bg-gray-800 text-gray-200"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            {isEdit ? (
              <FiEdit3 className="text-lg" />
            ) : (
              <FiPackage className="text-lg" />
            )}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight">
              {isEdit ? "Edit Product" : "Create Product"}
            </h1>
            <p className={`mt-1 text-xs sm:text-sm ${mutedClass}`}>
              {isEdit
                ? "Update product details, pricing, inventory, and images."
                : "Add a product to your catalog and configure its inventory."}
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <section className={sectionClass}>
          <div className="mb-4">
            <h2 className={headingClass}>Basic Information</h2>
            <p className={`mt-1 text-xs ${mutedClass}`}>
              Product name and category
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              type="text"
              name="name"
              value={formData.name}
              handleChange={handleFormData}
              label="Product Name"
            />

            <Dropdown
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleFormData}
              options={categoryOptions}
            />

            <div className="md:col-span-2">
              <Dropdown
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleFormData}
                options={brands}
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={sectionClass}>
          <div className="mb-4">
            <h2 className={headingClass}>Pricing</h2>
            <p className={`mt-1 text-xs ${mutedClass}`}>
              Set the regular and discounted prices
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              type="number"
              name="price"
              value={formData.price}
              handleChange={handleFormData}
              label="Regular Price"
              min={0}
            />

            <InputField
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              handleChange={handleFormData}
              label="Discount Price"
              min={0}
            />
          </div>
        </section>

        {/* Description */}
        <section className={sectionClass}>
          <div className="mb-4">
            <h2 className={headingClass}>Product Description</h2>
            <p className={`mt-1 text-xs ${mutedClass}`}>
              Add product details and care information
            </p>
          </div>

          <div className="space-y-4">
            <InputField
              type="text"
              name="description"
              value={formData.description}
              handleChange={handleFormData}
              label="Description"
            />

            <InputField
              type="text"
              name="details"
              value={formData.details}
              handleChange={handleFormData}
              label="Details"
            />

            <InputField
              type="text"
              name="careFit"
              value={formData.careFit}
              handleChange={handleFormData}
              label="Care & Fit"
            />
          </div>
        </section>

        {/* Product Status */}
        <section className={sectionClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className={headingClass}>Product Status</h2>
              <p className={`mt-1 text-xs ${mutedClass}`}>
                Configure the product's sale status
              </p>
            </div>

            <CheckBox
              label="On Sale"
              name="isOnSale"
              checked={formData.isOnSale}
              onChange={handleFormData}
            />
          </div>
        </section>

        {/* Variants and Stock */}
        <section className={sectionClass}>
          <div className="mb-4">
            <h2 className={headingClass}>Variants & Inventory</h2>
            <p className={`mt-1 text-xs ${mutedClass}`}>
              Select available sizes and assign stock quantities
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {/* Available Sizes */}
            <div className="min-w-0">
              <p
                className={`mb-2 text-xs font-medium uppercase tracking-wider ${mutedClass}`}
              >
                Available Sizes
              </p>

              <div
                className={`space-y-1 rounded-lg border p-2 ${
                  isDark
                    ? "border-gray-700 bg-gray-900/60"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                {sizes.map((size) => {
                  const isSelected = variants.some(
                    (variant) => variant.size === size
                  );

                  return (
                    <div
                      key={size}
                      className={`flex min-h-9 items-center rounded-md px-2 ${
                        isDark ? "hover:bg-gray-800" : "hover:bg-white"
                      }`}
                    >
                      <CheckBox
                        label={size}
                        checked={isSelected}
                        onChange={(value) =>
                          handleSizeChange(
                            size,
                            typeof value === "boolean"
                              ? value
                              : value.target.checked
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stock Quantities */}
            <div className="min-w-0">
              <p
                className={`mb-2 text-xs font-medium uppercase tracking-wider ${mutedClass}`}
              >
                Stock Quantity
              </p>

              <div
                className={`space-y-1 rounded-lg border p-2 ${
                  isDark
                    ? "border-gray-700 bg-gray-900/60"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                {sizes.map((size) => {
                  const variant = variants.find(
                    (item) => item.size === size
                  );

                  return (
                    <div
                      key={size}
                      className="flex min-h-9 items-center gap-3 px-1"
                    >
                      <span
                        className={`flex h-7 w-10 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                          isDark
                            ? "bg-gray-800 text-gray-200"
                            : "border border-gray-200 bg-white text-gray-700"
                        }`}
                      >
                        {size}
                      </span>

                      {variant ? (
                        <input
                          type="number"
                          min="0"
                          value={variant.stock}
                          aria-label={`Stock quantity for size ${size}`}
                          onChange={(e) =>
                            handleStockChange(size, e.target.value)
                          }
                          className={`h-8 min-w-0 flex-1 rounded-md border px-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 ${
                            isDark
                              ? "border-gray-700 bg-gray-800 text-white"
                              : "border-gray-200 bg-white text-gray-900"
                          }`}
                        />
                      ) : (
                        <div
                          className={`flex h-8 flex-1 items-center rounded-md border px-3 text-xs ${
                            isDark
                              ? "border-gray-800 bg-gray-800/50 text-gray-600"
                              : "border-gray-200 bg-gray-100 text-gray-400"
                          }`}
                        >
                          Select size first
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Images */}
        <section className={sectionClass}>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isDark
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <FiImage className="text-lg" />
            </div>

            <div>
              <h2 className={headingClass}>Product Images</h2>
              <p className={`mt-1 text-xs ${mutedClass}`}>
                Select one or more product images
              </p>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className={`block w-full rounded-lg border p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:px-3 file:py-2 file:text-xs file:font-medium ${
              isDark
                ? "border-gray-700 text-gray-400 file:bg-gray-700 file:text-gray-200"
                : "border-gray-200 text-gray-600 file:bg-gray-100 file:text-gray-700"
            }`}
          />
        </section>

        {/* Actions */}
        <div
          className={`flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <Button
            label={isEdit ? "Update Product" : "Create Product"}
            type="submit"
            variant={isDark ? "secondary" : "primary"}
            className="w-full sm:w-auto sm:min-w-[170px]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
