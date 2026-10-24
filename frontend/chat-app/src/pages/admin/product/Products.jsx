// //resuable componments
// import Button from "../../../components/ui/Button";
// import Table from "../../../components/ui/Table";
// import AdminPanelCard from "../../../components/ui/AdminPanelCard";
// import SearchBar from "../../../components/ui/SearchBar";
// import Dropdown from "../../../components/ui/Dropdown";
// import ActionMenu from "../../../components/ui/ActionMenu";
// // reusable model
// import Modal from "../../../components/ui/Modal";
// import ViewModal from "../../../components/ui/ViewModel";
// //icon
// import { IoIosAdd } from "react-icons/io";
// //create product page
// import CreateProduct from "../product/CreateProduct";
// ///products custom hook
// import { useProduct } from "../../../hooks/admin/product/useProduct";

// const FetchProducts = () => {
//   const {
//     //theme
//     isDark,
//     //product data
//     productsData,
//     //search state
//     search,
//     setSearch,
//     //category state
//     category,
//     setCategory,
//     categoryOptions,
//     //brand state
//     brand,
//     setBrand,
//     //product state
//     productStatus,
//     setProductStatus,
//     //model
//     openCreateProductFormModal,
//     setOpenCreateProductFormModal,
//     openViewModel,
//     setOpenViewModel,
//     isOpenConfirmDeleteModel,
//     setIsOpenConfirmDeleteModel,
//     //state for store selected product id
//     selectedProductId,
//     setSelectedProductId,
//     //state for store selected product
//     selectedProduct,
//     //filte product
//     filteredProducts,

//     //handler for CRUD
//     handleUpdateProduct,
//     handleDeleteProduct,
//     handleViewProduct,
//   } = useProduct();

//   // Main page background and default text color based on the current theme
//   const pageBg = isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";

//   // Card background and border color based on the current theme
//   const cardBg = isDark
//     ? "bg-gray-800 border-gray-700"
//     : "bg-white border-gray-200";

//   // Main heading text color based on the current theme
//   const heading = isDark ? "text-white" : "text-gray-900";

//   // Subheading text color based on the current theme
//   const subHeading = isDark ? "text-gray-400" : "text-gray-500";

//   ///brand options
//   const brands = [
//     { label: "All Brands", value: "" },
//     { label: "Plum", value: "Plum" },
//     { label: "Calvin Klein", value: "Calvin Klein" },
//     { label: "Fossil", value: "Fossil" },
//     { label: "Gucci", value: "Gucci" },
//     { label: "L'Oréal", value: "LOreal" },
//   ];

//   //product status options
//   const productStatusOptions = [
//     { label: "All Status", value: "" },
//     { label: "On Sale", value: "onSale" },
//     { label: "Regular", value: "Regular" },
//   ];

//   ///product table column
//   const productColumns = [
//     {
//       key: "image",
//       label: "Product",
//       render: (row) => (
//         <div className="flex items-center gap-4">
//           <img
//             src={row.images?.[0]}
//             alt={row.name}
//             className={`w-16 h-16 rounded-lg object-cover border ${
//               isDark ? "border-gray-700" : "border-gray-200"
//             }`}
//           />

//           <div>
//             <h3
//               className={`font-semibold ${
//                 isDark ? "text-white" : "text-gray-800"
//               }`}
//             >
//               {row.name}
//             </h3>

//             <p
//               className={`text-sm ${
//                 isDark ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               {row.brand}
//             </p>
//           </div>
//         </div>
//       ),
//     },

//     {
//       key: "category",
//       label: "Category",
//       render: (row) => (
//         <span
//           className={`font-medium ${
//             isDark ? "text-gray-300" : "text-gray-600"
//           }`}
//         >
//           {row.category.charAt(0)?.toUpperCase() + row.category.slice(1)}
//         </span>
//       ),
//     },

//     {
//       key: "price",
//       label: "Price",
//       render: (row) => (
//         <span
//           className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
//         >
//           ₹{row.price}
//         </span>
//       ),
//     },

//     {
//       key: "discountPrice",
//       label: "Discount Price",
//       render: (row) => (
//         <span className="font-semibold text-green-500">
//           ₹{row.discountPrice}
//         </span>
//       ),
//     },

//     {
//       key: "isOnSale",
//       label: "Status",
//       render: (row) =>
//         row.isOnSale ? (
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 isDark:bg-green-900/40 isDark:text-green-300">
//             ● On Sale
//           </span>
//         ) : (
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 isDark:bg-red-900/40 isDark:text-red-300">
//             ● Regular
//           </span>
//         ),
//     },

//     {
//       key: "brand",
//       label: "Brand",
//       render: (row) => (
//         <span className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
//           {row.brand}
//         </span>
//       ),
//     },

//     {
//       key: "actions",
//       label: "",
//       render: (row) => (
//         <ActionMenu
//           row={row}
//           onView={handleViewProduct}
//           onEdit={handleUpdateProduct}
//           onDelete={() => {
//             setSelectedProductId(row._id);
//             setIsOpenConfirmDeleteModel(true);
//           }}
//         />
//       ),
//     },
//   ];

//   return (
//    <div className={`w-full p-6 transition-all duration-300 ${pageBg}`}>
//       {/* Header */}
//       <div className={`space-y-0 rounded shadow-sm border ${cardBg}`}>
//         {/* Heading + search bar */}
//         <div
//           className={`flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-5 border-b ${
//             isDark ? "border-gray-700" : "border-gray-100"
//           }`}
//         >
//           <div>
//             <h1 className={`text-2xl font-semibold ${heading}`}>Products</h1>

//             <p className={`text-sm mt-1 ${subHeading}`}>
//               View and manage all products in your admin dashboard.
//             </p>
//           </div>

//           {/*SearchBar*/}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
//             <div className="w-full sm:w-72">
//               <SearchBar
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//             {/*button to open create product form model*/}
//             <Button
//               className="h-12 w-full sm:w-auto px-5"
//               label="Add Product"
//               icon={<IoIosAdd className="text-xl" />}
//               onClick={() => setOpenCreateProductFormModal(true)}
//               variant={isDark ? "secondary" : "primary"}
//             />
//           </div>
//         </div>

//         {/* product Model */}
//         <Modal
//           isOpen={openCreateProductFormModal}
//           onClose={() => {
//             setOpenCreateProductFormModal(false);
//             setSelectedProductId(null);
//           }}

//         >
//           {/* pass product id for edit product */}
//           <CreateProduct
//             productId={selectedProductId}
//             setProductFormModelIsOpen={setOpenCreateProductFormModal}
//           />
//         </Modal>

//         {/* Filters */}
//         <div
//           className={`flex flex-col md:flex-row md:items-end gap-5 p-5 ${
//             isDark ? "border-t border-gray-700" : "border-t border-gray-100"
//           }`}
//         >
//           {/*category dropdown */}
//           <div className="w-full md:w-auto">
//             <Dropdown
//               name="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               options={categoryOptions}
//             />
//           </div>

//           {/*brand dropdown */}
//           <div className="w-full md:w-auto">
//             <Dropdown
//               name="brand"
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//               options={brands}
//             />
//           </div>

//           {/*status dropdown */}
//           <div className="w-full md:w-auto">
//             <Dropdown
//               name="status"
//               value={productStatus}
//               onChange={(e) => setProductStatus(e.target.value)}
//               options={productStatusOptions}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Statistics */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-8">
//         <AdminPanelCard title="Total Products" value={productsData.length} />

//         <AdminPanelCard
//           title="On Sale"
//           value={productsData.filter((item) => item.isOnSale).length} //Array → .length
//         />

//         <AdminPanelCard
//           title="Brands"
//           value={new Set(productsData.map((item) => item.brand)).size} //Set → .size
//         />

//         <AdminPanelCard
//           title="Categories"
//           value={new Set(productsData.map((item) => item.category)).size} //Set → .size
//         />
//       </div>

//     <ViewModal
//   isOpen={openViewModel}
//   onClose={() => setOpenViewModel(false)}
//   title="View Product"
// >
//   {selectedProduct ? (
//     <div
//       className={`
//         ${
//           isDark
//             ? "text-white"
//             : "text-gray-900"
//         }
//       `}
//     >
//       {/* =====================================================
//           PRODUCT OVERVIEW
//       ====================================================== */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* =====================================================
//             LEFT — PRODUCT IMAGES
//         ====================================================== */}
//         <div>

//           {/* Main Image */}
//           <div
//             className={`
//               relative
//               rounded-2xl
//               border
//               overflow-hidden
//               ${
//                 isDark
//                   ? "bg-gray-950 border-gray-800"
//                   : "bg-gray-50 border-gray-200"
//               }
//             `}
//           >
//             {/* Sale Label */}
//             {selectedProduct.isOnSale && (
//               <div
//                 className={`
//                   absolute
//                   top-4
//                   left-4
//                   z-10
//                   px-3
//                   py-1.5
//                   rounded-full
//                   text-[10px]
//                   font-medium
//                   uppercase
//                   tracking-[0.15em]
//                   border
//                   ${
//                     isDark
//                       ? "bg-gray-950 border-gray-700 text-gray-300"
//                       : " bg-black text-white"
//                   }
//                 `}
//               >
//                 Sale
//               </div>
//             )}

//             {/* Image */}
//             <div className="aspect-square flex items-center justify-center p-6 sm:p-8">
//               {selectedProduct.images?.[0] ? (
//                 <img
//                   src={selectedProduct.images[0]}
//                   alt={selectedProduct.name}
//                   className="
//                     w-full
//                     h-full
//                     object-contain
//                     rounded-xl
//                     transition-transform
//                     duration-500
//                     hover:scale-[1.02]
//                   "
//                 />
//               ) : (
//                 <div
//                   className={`
//                     flex
//                     items-center
//                     justify-center
//                     w-full
//                     h-full
//                     text-sm
//                     ${
//                       isDark
//                         ? "text-gray-600"
//                         : "text-gray-400"
//                     }
//                   `}
//                 >
//                   No Image Available
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* =================================================
//               IMAGE THUMBNAILS
//           ================================================== */}
//           {selectedProduct.images?.length > 1 && (
//             <div className="flex gap-3 mt-4 overflow-x-auto pb-1">

//               {selectedProduct.images.map(
//                 (image, index) => (
//                   <button
//                     type="button"
//                     key={index}
//                     className={`
//                       flex-shrink-0
//                       w-16
//                       h-16
//                       sm:w-18
//                       sm:h-18
//                       rounded-xl
//                       overflow-hidden
//                       border
//                       transition-all
//                       ${
//                         index === 0
//                           ? isDark
//                             ? "border-white"
//                             : "border-gray-900"
//                           : isDark
//                             ? "border-gray-800 hover:border-gray-600"
//                             : "border-gray-200 hover:border-gray-400"
//                       }
//                     `}
//                   >
//                     <img
//                       src={image}
//                       alt={`${selectedProduct.name}-${index}`}
//                       className="
//                         w-full
//                         h-full
//                         object-cover
//                       "
//                     />
//                   </button>
//                 )
//               )}

//             </div>
//           )}
//         </div>

//         {/* =====================================================
//             RIGHT — PRODUCT DETAILS
//         ====================================================== */}
//         <div className="flex flex-col">

//           {/* Brand */}
//           <p
//             className={`
//               text-[10px]
//               uppercase
//               tracking-[0.2em]
//               font-medium
//               mb-2
//               ${
//                 isDark
//                   ? "text-gray-500"
//                   : "text-gray-400"
//               }
//             `}
//           >
//             {selectedProduct.brand || "Brand"}
//           </p>

//           {/* Product Name */}
//           <h1
//             className={`
//               text-2xl
//               sm:text-3xl
//               font-semibold
//               tracking-tight
//               leading-tight
//               ${
//                 isDark
//                   ? "text-white"
//                   : "text-gray-950"
//               }
//             `}
//           >
//             {selectedProduct.name}
//           </h1>

//           {/* =================================================
//               RATING
//           ================================================== */}
//           <div className="flex items-center gap-3 mt-4">

//             <span
//               className={`
//                 text-sm
//                 font-medium
//                 ${
//                   isDark
//                     ? "text-white"
//                     : "text-gray-900"
//                 }
//               `}
//             >
//               ★ {selectedProduct.rating || "4.5"}
//             </span>

//             <span
//               className={`
//                 text-xs
//                 ${
//                   isDark
//                     ? "text-gray-500"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               Customer Rating
//             </span>

//           </div>

//           {/* =================================================
//               PRICE
//           ================================================== */}
//           <div
//             className={`
//               mt-6
//               pt-6
//               border-t
//               ${
//                 isDark
//                   ? "border-gray-800"
//                   : "border-gray-200"
//               }
//             `}
//           >
//             <div className="flex flex-wrap items-baseline gap-3">

//               {/* Selling Price */}
//               <span
//                 className={`
//                   text-3xl
//                   font-semibold
//                   tracking-tight
//                   ${
//                     isDark
//                       ? "text-white"
//                       : "text-gray-950"
//                   }
//                 `}
//               >
//                 ₹
//                 {selectedProduct.discountPrice ||
//                   selectedProduct.price ||
//                   0}
//               </span>

//               {/* Original Price */}
//               {selectedProduct.discountPrice &&
//                 Number(selectedProduct.price) >
//                   Number(
//                     selectedProduct.discountPrice
//                   ) && (
//                   <>
//                     <span
//                       className={`
//                         text-base
//                         line-through
//                         ${
//                           isDark
//                             ? "text-gray-600"
//                             : "text-gray-400"
//                         }
//                       `}
//                     >
//                       ₹{selectedProduct.price}
//                     </span>

//                     {/* Discount */}
//                     <span
//                       className={`
//                         text-xs
//                         font-medium
//                         ${
//                           isDark
//                             ? "text-gray-400"
//                             : "text-gray-500"
//                         }
//                       `}
//                     >
//                       {Math.round(
//                         ((selectedProduct.price -
//                           selectedProduct.discountPrice) /
//                           selectedProduct.price) *
//                           100
//                       )}
//                       % OFF
//                     </span>
//                   </>
//                 )}

//             </div>

//             <p
//               className={`
//                 text-[11px]
//                 mt-2
//                 ${
//                   isDark
//                     ? "text-gray-600"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               Inclusive of all taxes
//             </p>
//           </div>

//           {/* =================================================
//               STATUS
//           ================================================== */}
//           <div className="flex flex-wrap items-center gap-2 mt-5">

//             {/* Sale */}
//             {selectedProduct.isOnSale && (
//               <span
//                 className={`
//                   px-3
//                   py-1.5
//                   rounded-full
//                   text-[10px]
//                   uppercase
//                   tracking-[0.12em]
//                   font-medium
//                   border
//                   ${
//                     isDark
//                       ? "border-gray-600 text-gray-300"
//                       : "border-gray-300 text-gray-700"
//                   }
//                 `}
//               >
//                 On Sale
//               </span>
//             )}

//             {/* Regular */}
//             {!selectedProduct.isOnSale && (
//               <span
//                 className={`
//                   px-3
//                   py-1.5
//                   rounded-full
//                   text-[10px]
//                   uppercase
//                   tracking-[0.12em]
//                   font-medium
//                   border
//                   ${
//                     isDark
//                       ? "border-gray-800 text-gray-500"
//                       : "border-gray-200 text-gray-500"
//                   }
//                 `}
//               >
//                 Regular Price
//               </span>
//             )}

//             {/* Stock */}
//             <span
//               className={`
//                 px-3
//                 py-1.5
//                 rounded-full
//                 text-[10px]
//                 uppercase
//                 tracking-[0.12em]
//                 font-medium
//                 border
//                 ${
//                   isDark
//                     ? "border-gray-800 text-gray-400"
//                     : "border-gray-200 text-gray-500"
//                 }
//               `}
//             >
//               In Stock
//             </span>

//           </div>

//           {/* =================================================
//               PRODUCT INFORMATION
//           ================================================== */}
//           <div
//             className={`
//               grid
//               grid-cols-2
//               mt-6
//               border-y
//               ${
//                 isDark
//                   ? "border-gray-800"
//                   : "border-gray-200"
//               }
//             `}
//           >

//             {/* Category */}
//             <div
//               className={`
//                 py-4
//                 pr-4
//                 border-r
//                 ${
//                   isDark
//                     ? "border-gray-800"
//                     : "border-gray-200"
//                 }
//               `}
//             >
//               <p
//                 className={`
//                   text-[10px]
//                   uppercase
//                   tracking-[0.15em]
//                   ${
//                     isDark
//                       ? "text-gray-600"
//                       : "text-gray-400"
//                   }
//                 `}
//               >
//                 Category
//               </p>

//               <p
//                 className={`
//                   text-sm
//                   font-medium
//                   mt-1.5
//                   truncate
//                   ${
//                     isDark
//                       ? "text-gray-200"
//                       : "text-gray-800"
//                   }
//                 `}
//               >
//                 {selectedProduct.category || "N/A"}
//               </p>
//             </div>

//             {/* Brand */}
//             <div className="py-4 pl-4">
//               <p
//                 className={`
//                   text-[10px]
//                   uppercase
//                   tracking-[0.15em]
//                   ${
//                     isDark
//                       ? "text-gray-600"
//                       : "text-gray-400"
//                   }
//                 `}
//               >
//                 Brand
//               </p>

//               <p
//                 className={`
//                   text-sm
//                   font-medium
//                   mt-1.5
//                   truncate
//                   ${
//                     isDark
//                       ? "text-gray-200"
//                       : "text-gray-800"
//                   }
//                 `}
//               >
//                 {selectedProduct.brand || "N/A"}
//               </p>
//             </div>

//             {/* Product ID */}
//             <div
//               className={`
//                 py-4
//                 pr-4
//                 border-t
//                 border-r
//                 ${
//                   isDark
//                     ? "border-gray-800"
//                     : "border-gray-200"
//                 }
//               `}
//             >
//               <p
//                 className={`
//                   text-[10px]
//                   uppercase
//                   tracking-[0.15em]
//                   ${
//                     isDark
//                       ? "text-gray-600"
//                       : "text-gray-400"
//                   }
//                 `}
//               >
//                 Product ID
//               </p>

//               <p
//                 className={`
//                   text-xs
//                   font-medium
//                   mt-1.5
//                   truncate
//                   ${
//                     isDark
//                       ? "text-gray-300"
//                       : "text-gray-600"
//                   }
//                 `}
//                 title={selectedProduct._id}
//               >
//                 {selectedProduct._id || "N/A"}
//               </p>
//             </div>

//             {/* Availability */}
//             <div
//               className={`
//                 py-4
//                 pl-4
//                 border-t
//                 ${
//                   isDark
//                     ? "border-gray-800"
//                     : "border-gray-200"
//                 }
//               `}
//             >
//               <p
//                 className={`
//                   text-[10px]
//                   uppercase
//                   tracking-[0.15em]
//                   ${
//                     isDark
//                       ? "text-gray-600"
//                       : "text-gray-400"
//                   }
//                 `}
//               >
//                 Availability
//               </p>

//               <p
//                 className={`
//                   text-sm
//                   font-medium
//                   mt-1.5
//                   ${
//                     isDark
//                       ? "text-gray-300"
//                       : "text-gray-700"
//                   }
//                 `}
//               >
//                 In Stock
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           DESCRIPTION
//       ====================================================== */}
//       <div
//         className={`
//           border-t
//           mt-8
//           pt-7
//           ${
//             isDark
//               ? "border-gray-800"
//               : "border-gray-200"
//           }
//         `}
//       >
//         <h3
//           className={`
//             text-base
//             font-semibold
//             mb-3
//             ${
//               isDark
//                 ? "text-white"
//                 : "text-gray-950"
//             }
//           `}
//         >
//           Product Description
//         </h3>

//         <p
//           className={`
//             max-w-4xl
//             text-sm
//             leading-7
//             ${
//               isDark
//                 ? "text-gray-400"
//                 : "text-gray-600"
//             }
//           `}
//         >
//           {selectedProduct.description ||
//             "No description available for this product."}
//         </p>
//       </div>

//       {/* =====================================================
//           ADDITIONAL INFORMATION
//       ====================================================== */}
//       <div
//         className={`
//           border-t
//           mt-7
//           pt-7
//           ${
//             isDark
//               ? "border-gray-800"
//               : "border-gray-200"
//           }
//         `}
//       >
//         <h3
//           className={`
//             text-base
//             font-semibold
//             mb-4
//             ${
//               isDark
//                 ? "text-white"
//                 : "text-gray-950"
//             }
//           `}
//         >
//           Pricing Information
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

//           {/* Regular Price */}
//           <div
//             className={`
//               p-4
//               rounded-xl
//               ${
//                 isDark
//                   ? "bg-gray-900"
//                   : "bg-gray-50"
//               }
//             `}
//           >
//             <p
//               className={`
//                 text-[10px]
//                 uppercase
//                 tracking-[0.15em]
//                 ${
//                   isDark
//                     ? "text-gray-600"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               Regular Price
//             </p>

//             <p
//               className={`
//                 text-lg
//                 font-semibold
//                 mt-2
//                 ${
//                   isDark
//                     ? "text-white"
//                     : "text-gray-900"
//                 }
//               `}
//             >
//               ₹{selectedProduct.price || 0}
//             </p>
//           </div>

//           {/* Selling Price */}
//           <div
//             className={`
//               p-4
//               rounded-xl
//               ${
//                 isDark
//                   ? "bg-gray-900"
//                   : "bg-gray-50"
//               }
//             `}
//           >
//             <p
//               className={`
//                 text-[10px]
//                 uppercase
//                 tracking-[0.15em]
//                 ${
//                   isDark
//                     ? "text-gray-600"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               Selling Price
//             </p>

//             <p
//               className={`
//                 text-lg
//                 font-semibold
//                 mt-2
//                 ${
//                   isDark
//                     ? "text-gray-200"
//                     : "text-gray-800"
//                 }
//               `}
//             >
//               ₹
//               {selectedProduct.discountPrice ||
//                 selectedProduct.price ||
//                 0}
//             </p>
//           </div>

//           {/* Sale Status */}
//           <div
//             className={`
//               p-4
//               rounded-xl
//               ${
//                 isDark
//                   ? "bg-gray-900"
//                   : "bg-gray-50"
//               }
//             `}
//           >
//             <p
//               className={`
//                 text-[10px]
//                 uppercase
//                 tracking-[0.15em]
//                 ${
//                   isDark
//                     ? "text-gray-600"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               Sale Status
//             </p>

//             <p
//               className={`
//                 text-sm
//                 font-semibold
//                 mt-2
//                 ${
//                   selectedProduct.isOnSale
//                     ? "text-green-600"
//                     : isDark
//                       ? "text-gray-300"
//                       : "text-gray-700"
//                 }
//               `}
//             >
//               {selectedProduct.isOnSale
//                 ? "On Sale"
//                 : "Regular Price"}
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* =====================================================
//           VARIANTS / SIZES
//       ====================================================== */}
//       {selectedProduct.variants?.length > 0 && (
//         <div
//           className={`
//             border-t
//             mt-7
//             pt-7
//             ${
//               isDark
//                 ? "border-gray-800"
//                 : "border-gray-200"
//             }
//           `}
//         >
//           <div className="flex items-center justify-between mb-4">

//             <h3
//               className={`
//                 text-base
//                 font-semibold
//                 ${
//                   isDark
//                     ? "text-white"
//                     : "text-gray-950"
//                 }
//               `}
//             >
//               Available Sizes
//             </h3>

//             <span
//               className={`
//                 text-xs
//                 ${
//                   isDark
//                     ? "text-gray-600"
//                     : "text-gray-400"
//                 }
//               `}
//             >
//               {selectedProduct.variants.length} variants
//             </span>

//           </div>

//           <div className="flex flex-wrap gap-2">

//             {selectedProduct.variants.map(
//               (variant, index) => (
//                 <div
//                   key={index}
//                   className={`
//                     min-w-[72px]
//                     px-3
//                     py-2.5
//                     rounded-lg
//                     border
//                     text-center
//                     ${
//                       isDark
//                         ? "bg-gray-950 border-gray-800"
//                         : "bg-white border-gray-200"
//                     }
//                   `}
//                 >
//                   <p
//                     className={`
//                       text-sm
//                       font-medium
//                       ${
//                         isDark
//                           ? "text-gray-200"
//                           : "text-gray-800"
//                       }
//                     `}
//                   >
//                     {variant.size}
//                   </p>

//                   <p
//                     className={`
//                       text-[10px]
//                       mt-1
//                       ${
//                         variant.stock > 0
//                           ? "text-green-600"
//                           : "text-red-500"
//                       }
//                     `}
//                   >
//                     {variant.stock > 0
//                       ? `${variant.stock} in stock`
//                       : "Out of stock"}
//                   </p>
//                 </div>
//               )
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   ) : (
//     <div
//       className={`
//         py-16
//         text-center
//         ${
//           isDark
//             ? "text-gray-500"
//             : "text-gray-400"
//         }
//       `}
//     >
//       Product not found.
//     </div>
//   )}
// </ViewModal>

//       <Modal
//         isOpen={isOpenConfirmDeleteModel}
//         onClose={() => {
//           setIsOpenConfirmDeleteModel(false);
//           setSelectedProductId(null);
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
//               Delete product?
//             </h2>

//             <p
//               className={`mt-2 max-w-sm text-sm leading-6 ${
//                 isDark ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               This product will be permanently removed from your catalog. This
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
//                 setSelectedProductId(null);
//               }}
//             />

//             <Button
//               label="Delete"
//               variant="danger"
//               onClick={async () => {
//                 await handleDeleteProduct(selectedProductId);

//                 setIsOpenConfirmDeleteModel(false);
//                 setSelectedProductId(null);
//               }}
//             />
//           </div>
//         </div>
//       </Modal>

//       {/*table*/}
//       <Table data={filteredProducts} columns={productColumns} />
//     </div>
//   );
// };

// export default FetchProducts;

import React, { useState } from "react";

// Reusable components
import Button from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import AdminPanelCard from "../../../components/ui/AdminPanelCard";
import SearchBar from "../../../components/ui/SearchBar";
import Dropdown from "../../../components/ui/Dropdown";
import ActionMenu from "../../../components/ui/ActionMenu";

// Reusable modals
import Modal from "../../../components/ui/Modal";
import ViewModal from "../../../components/ui/ViewModel";

// Icons
import { IoIosAdd } from "react-icons/io";

// Create product page
import CreateProduct from "../product/CreateProduct";

// Custom hook
import { useProduct } from "../../../hooks/admin/product/useProduct";

const FetchProducts = () => {
  const {
    isDark,
    productsData = [],

    search,
    setSearch,

    category,
    setCategory,
    categoryOptions,

    brand,
    setBrand,

    productStatus,
    setProductStatus,

    openCreateProductFormModal,
    setOpenCreateProductFormModal,

    openViewModel,
    setOpenViewModel,

    isOpenConfirmDeleteModel,
    setIsOpenConfirmDeleteModel,

    selectedProductId,
    setSelectedProductId,

    selectedProduct,

    filteredProducts = [],

    handleUpdateProduct,
    handleDeleteProduct,
    handleViewProduct,
  } = useProduct();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Theme styles
  const pageBg = isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";

  const cardBg = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  const heading = isDark ? "text-white" : "text-gray-900";
  const subHeading = isDark ? "text-gray-400" : "text-gray-500";

  const borderColor = isDark ? "border-gray-700" : "border-gray-100";

  // Brand options
  const brands = [
    { label: "All Brands", value: "" },
    { label: "Plum", value: "Plum" },
    { label: "Calvin Klein", value: "Calvin Klein" },
    { label: "Fossil", value: "Fossil" },
    { label: "Gucci", value: "Gucci" },
    { label: "L'Oréal", value: "LOreal" },
  ];

  // Product status options
  const productStatusOptions = [
    { label: "All Status", value: "" },
    { label: "On Sale", value: "onSale" },
    { label: "Regular", value: "Regular" },
  ];

  // Safe price formatting
  const formatPrice = (price) => Number(price ?? 0).toLocaleString("en-IN");

  const productColumns = [
    {
      key: "image",
      label: "Product",
      render: (row) => (
        <div className="flex min-w-[170px] items-center gap-2">
          <div
            className={`h-8 w-8 shrink-0 overflow-hidden rounded border ${
              isDark
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            {row.images?.[0] ? (
              <img
                src={row.images[0]}
                alt={row.name || "Product"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[8px] text-gray-400">
                N/A
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3
              className={`max-w-[180px] truncate text-[11px] font-medium leading-4 ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
              title={row.name}
            >
              {row.name || "Untitled product"}
            </h3>

            <p
              className={`truncate text-[10px] leading-3 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {row.brand || "No brand"}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
      render: (row) => {
        const categoryName = row.category || "Uncategorized";

        return (
          <span className={isDark ? "text-gray-300" : "text-gray-600"}>
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </span>
        );
      },
    },

    {
      key: "price",
      label: "Price",
      render: (row) => (
        <span
          className={`font-medium whitespace-nowrap ${
            isDark ? "text-gray-200" : "text-gray-900"
          }`}
        >
          ₹{formatPrice(row.price)}
        </span>
      ),
    },

    {
      key: "discountPrice",
      label: "Discount Price",
      render: (row) => {
        const hasDiscount =
          row.discountPrice !== null &&
          row.discountPrice !== undefined &&
          row.discountPrice !== "" &&
          Number(row.discountPrice) < Number(row.price);

        return (
          <span
            className={`whitespace-nowrap font-medium ${
              hasDiscount
                ? "text-green-500"
                : isDark
                  ? "text-gray-400"
                  : "text-gray-500"
            }`}
          >
            ₹{formatPrice(hasDiscount ? row.discountPrice : row.price)}
          </span>
        );
      },
    },

    {
      key: "isOnSale",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${
            row.isOnSale
              ? isDark
                ? "bg-green-500/10 text-green-400"
                : "bg-green-50 text-green-700"
              : isDark
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              row.isOnSale ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          {row.isOnSale ? "On Sale" : "Regular"}
        </span>
      ),
    },

    {
      key: "brand",
      label: "Brand",
      render: (row) => (
        <span className="whitespace-nowrap">{row.brand || "—"}</span>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <ActionMenu
          row={row}
          onView={(product) => {
            setActiveImageIndex(0);
            handleViewProduct(product);
          }}
          onEdit={handleUpdateProduct}
          onDelete={() => {
            setSelectedProductId(row._id);
            setIsOpenConfirmDeleteModel(true);
          }}
        />
      ),
    },
  ];

  // Reset image selection when the selected product changes
  const productImages = selectedProduct?.images || [];
  const activeImage = productImages[activeImageIndex] || productImages[0];

  const regularPrice = Number(selectedProduct?.price ?? 0);
  const discountPrice =
    selectedProduct?.discountPrice !== null &&
    selectedProduct?.discountPrice !== undefined &&
    selectedProduct?.discountPrice !== ""
      ? Number(selectedProduct.discountPrice)
      : null;

  const hasDiscount = discountPrice !== null && discountPrice < regularPrice;

  const sellingPrice = hasDiscount ? discountPrice : regularPrice;

  const discountPercentage =
    hasDiscount && regularPrice > 0
      ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
      : 0;

  // Statistics
  const totalProducts = productsData.length;

  const onSaleProducts = productsData.filter((item) => item.isOnSale).length;

  const totalBrands = new Set(
    productsData.map((item) => item.brand).filter(Boolean),
  ).size;

  const totalCategories = new Set(
    productsData.map((item) => item.category).filter(Boolean),
  ).size;

  return (
    <div
      className={`w-full min-w-0 space-y-4 px-3 transition-colors duration-200 sm:p-4 ${pageBg}`}
    >
      {/* Header and filters */}
      <section
        className={`overflow-hidden rounded-lg border shadow-sm ${cardBg}`}
      >
        {/* Page heading */}
        <div
          className={`flex flex-col gap-3 border-b p-3 sm:p-4 md:flex-row md:items-center md:justify-between ${borderColor}`}
        >
          <div className="min-w-0">
            <h1 className={`text-xl font-semibold tracking-tight ${heading}`}>
              Products
            </h1>

            <p className={`mt-1 text-xs sm:text-sm ${subHeading}`}>
              View and manage your product catalog.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <div className="w-full sm:w-64">
              {/* <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              /> */}
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                isDark={isDark}
              />
            </div>

            <Button
              className="h-8 w-full px-4 sm:w-auto"
              label="Add Product"
              icon={<IoIosAdd className="text-xl" />}
              onClick={() => {
                setSelectedProductId(null);
                setOpenCreateProductFormModal(true);
              }}
              variant={isDark ? "secondary" : "primary"}
            />
          </div>
        </div>

        {/* Create / edit product modal */}
        <Modal
          isOpen={openCreateProductFormModal}
          onClose={() => {
            setOpenCreateProductFormModal(false);
            setSelectedProductId(null);
          }}
        >
          <CreateProduct
            productId={selectedProductId}
            setProductFormModelIsOpen={setOpenCreateProductFormModal}
          />
        </Modal>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3">
          <div className="min-w-0">
            <Dropdown
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
            />
          </div>

          <div className="min-w-0">
            <Dropdown
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              options={brands}
            />
          </div>

          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Dropdown
              name="status"
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
              options={productStatusOptions}
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <AdminPanelCard title="Total Products" value={totalProducts} />

        <AdminPanelCard title="On Sale" value={onSaleProducts} />

        <AdminPanelCard title="Brands" value={totalBrands} />

        <AdminPanelCard title="Categories" value={totalCategories} />
      </section>

      {/* Product table */}
      <section
        className={`min-w-0 overflow-hidden rounded-lg border shadow-sm ${cardBg}`}
      >
        <div className="w-full min-w-0 overflow-x-auto">
          <Table data={filteredProducts} columns={productColumns} />
        </div>
      </section>

      {/* View product modal */}
      <ViewModal
        isOpen={openViewModel}
        onClose={() => {
          setOpenViewModel(false);
          setActiveImageIndex(0);
        }}
        title="Product Details"
      >
        {selectedProduct ? (
          <div
            className={`space-y-6 p-1 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {/* Product overview */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Images */}
              <div className="min-w-0">
                <div
                  className={`relative overflow-hidden rounded-xl border ${
                    isDark
                      ? "border-gray-700 bg-gray-900"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {selectedProduct.isOnSale && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                      On Sale
                    </span>
                  )}

                  <div className="flex aspect-square items-center justify-center p-5 sm:p-7">
                    {activeImage ? (
                      <img
                        src={activeImage}
                        alt={selectedProduct.name || "Product"}
                        className="h-full w-full rounded-lg object-contain"
                      />
                    ) : (
                      <p className="text-sm text-gray-400">
                        No image available
                      </p>
                    )}
                  </div>
                </div>

                {/* Selectable thumbnails */}
                {productImages.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {productImages.map((image, index) => (
                      <button
                        type="button"
                        key={`${image}-${index}`}
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`View product image ${index + 1}`}
                        aria-pressed={activeImageIndex === index}
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                          activeImageIndex === index
                            ? isDark
                              ? "border-blue-400"
                              : "border-blue-600"
                            : isDark
                              ? "border-gray-700 hover:border-gray-500"
                              : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name || "Product"} ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product details */}
              <div className="flex min-w-0 flex-col">
                <p
                  className={`mb-2 text-[10px] font-medium uppercase tracking-[0.18em] ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {selectedProduct.brand || "Unbranded"}
                </p>

                <h2 className="text-2xl font-semibold leading-tight tracking-tight">
                  {selectedProduct.name || "Untitled product"}
                </h2>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-medium">
                    ★ {selectedProduct.rating ?? "—"}
                  </span>
                  <span className={`text-xs ${subHeading}`}>
                    Customer rating
                  </span>
                </div>

                {/* Price */}
                <div className={`mt-5 border-t pt-5 ${borderColor}`}>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-semibold tracking-tight">
                      ₹{formatPrice(sellingPrice)}
                    </span>

                    {hasDiscount && (
                      <>
                        <span
                          className={`text-base line-through ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          ₹{formatPrice(regularPrice)}
                        </span>

                        <span
                          className={`text-xs font-medium ${
                            isDark ? "text-green-400" : "text-green-700"
                          }`}
                        >
                          {discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <p className={`mt-2 text-[11px] ${subHeading}`}>
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Status badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${
                      selectedProduct.isOnSale
                        ? isDark
                          ? "bg-green-500/10 text-green-400"
                          : "bg-green-50 text-green-700"
                        : isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selectedProduct.isOnSale ? "On Sale" : "Regular Price"}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selectedProduct.variants?.length
                      ? selectedProduct.variants.some(
                          (variant) => Number(variant.stock) > 0,
                        )
                        ? "In Stock"
                        : "Out of Stock"
                      : "Stock Not Specified"}
                  </span>
                </div>

                {/* Product information */}
                <div
                  className={`mt-5 grid grid-cols-2 border-y ${borderColor}`}
                >
                  <div className={`border-r py-3 pr-3 ${borderColor}`}>
                    <p
                      className={`text-[10px] uppercase tracking-wider ${subHeading}`}
                    >
                      Category
                    </p>
                    <p className="mt-1.5 truncate text-sm font-medium">
                      {selectedProduct.category || "N/A"}
                    </p>
                  </div>

                  <div className="py-3 pl-3">
                    <p
                      className={`text-[10px] uppercase tracking-wider ${subHeading}`}
                    >
                      Brand
                    </p>
                    <p className="mt-1.5 truncate text-sm font-medium">
                      {selectedProduct.brand || "N/A"}
                    </p>
                  </div>

                  <div className={`border-r border-t py-3 pr-3 ${borderColor}`}>
                    <p
                      className={`text-[10px] uppercase tracking-wider ${subHeading}`}
                    >
                      Product ID
                    </p>
                    <p
                      className={`mt-1.5 truncate text-xs ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                      title={selectedProduct._id}
                    >
                      {selectedProduct._id || "N/A"}
                    </p>
                  </div>

                  <div className={`border-t py-3 pl-3 ${borderColor}`}>
                    <p
                      className={`text-[10px] uppercase tracking-wider ${subHeading}`}
                    >
                      Variants
                    </p>
                    <p className="mt-1.5 text-sm font-medium">
                      {selectedProduct.variants?.length ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`border-t pt-5 ${borderColor}`}>
              <h3 className="text-sm font-semibold">Product Description</h3>

              <p
                className={`mt-2 whitespace-pre-line text-sm leading-6 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {selectedProduct.description ||
                  "No description available for this product."}
              </p>
            </div>

            {/* Pricing details */}
            <div className={`border-t pt-5 ${borderColor}`}>
              <h3 className="mb-3 text-sm font-semibold">
                Pricing Information
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div
                  className={`rounded-lg p-3 ${
                    isDark ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-wider ${subHeading}`}
                  >
                    Regular Price
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    ₹{formatPrice(regularPrice)}
                  </p>
                </div>

                <div
                  className={`rounded-lg p-3 ${
                    isDark ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-wider ${subHeading}`}
                  >
                    Selling Price
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    ₹{formatPrice(sellingPrice)}
                  </p>
                </div>

                <div
                  className={`rounded-lg p-3 ${
                    isDark ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-wider ${subHeading}`}
                  >
                    Sale Status
                  </p>
                  <p
                    className={`mt-2 text-sm font-semibold ${
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

            {/* Variants */}
            {selectedProduct.variants?.length > 0 && (
              <div className={`border-t pt-5 ${borderColor}`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">Available Variants</h3>
                  <span className={`text-xs ${subHeading}`}>
                    {selectedProduct.variants.length} variants
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.map((variant, index) => {
                    const stock = Number(variant.stock ?? 0);
                    const inStock = stock > 0;

                    return (
                      <div
                        key={variant._id || `${variant.size}-${index}`}
                        className={`min-w-[76px] rounded-lg border px-3 py-2.5 text-center ${
                          isDark
                            ? "border-gray-700 bg-gray-900"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {variant.size || `Variant ${index + 1}`}
                        </p>

                        <p
                          className={`mt-1 text-[10px] ${
                            inStock ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {inStock ? `${stock} in stock` : "Out of stock"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`py-12 text-center text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Product not found.
          </div>
        )}
      </ViewModal>

      {/* Confirm delete modal */}
      <Modal
        isOpen={isOpenConfirmDeleteModel}
        onClose={() => {
          setIsOpenConfirmDeleteModel(false);
          setSelectedProductId(null);
        }}
      >
        <div className="p-5 sm:p-6">
          <h2
            className={`text-lg font-semibold tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Delete product?
          </h2>

          <p
            className={`mt-2 max-w-sm text-sm leading-6 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            This product will be permanently removed from your catalog. This
            action cannot be undone.
          </p>

          <div className="mt-6 flex items-center justify-end gap-2">
            <Button
              label="Cancel"
              variant={isDark ? "secondary" : "outline"}
              onClick={() => {
                setIsOpenConfirmDeleteModel(false);
                setSelectedProductId(null);
              }}
            />

            <Button
              label="Delete"
              variant="danger"
              onClick={async () => {
                try {
                  await handleDeleteProduct(selectedProductId);
                } finally {
                  setIsOpenConfirmDeleteModel(false);
                  setSelectedProductId(null);
                }
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FetchProducts;
