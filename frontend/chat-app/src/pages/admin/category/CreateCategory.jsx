// //reusable ui components
// import InputField from "../../../components/ui/InputField";
// import CheckBox from "../../../components/ui/CheckBox";
// import Button from "../../../components/ui/Button";
// //category custom hook
// import { useCreateCategory } from "../../../hooks/admin/category/useCreateCategory";

// //get categoryId , onSuccess form category page as props
// const CreateCategory = ({ categoryId, onSuccess }) => {
//   //custom hook
//   const { isDark, handleSubmit, formData, isEditMode, handleChange } =
//     useCreateCategory({ id: categoryId, onSuccess });

//   return (
//     <div
//       className={` w-full max-w-5xl mx-auto ${isDark ? "text-white" : "text-gray-900"} `}
//     >
//       {/* Header */}
//       <div className="mb-8">
//         {/* title */}
//         <h2
//           className={` text-3xl font-bold p-2 ${isDark ? "text-white" : "text-gray-900"} `}
//         >
//           {isEditMode ? "Update Category" : "Create Category"}
//         </h2>
//         {/* para */}
//         <p
//           className={` mt-2 ml-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
//         >
//           Create and manage product categories for your store.
//         </p>
//       </div>

//       {/* create catgegory form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Information */}
//         <div
//           className={` border rounded-xl p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
//         >
//           <h3
//             className={` text-lg font-semibold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}
//           >
//             Basic Information
//           </h3>
//           <div className="grid md:grid-cols-2 gap-5">
//             <InputField
//               label="Category Name"
//               name="name"
//               value={formData.name}
//               handleChange={handleChange}
//               placeholder="Beauty"
//             />
//             <InputField
//               label="Slug"
//               name="slug"
//               value={formData.slug}
//               handleChange={handleChange}
//               placeholder="beauty"
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div
//           className={` border rounded-xl p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} `}
//         >
//           <h3
//             className={` text-lg font-semibold mb-5 ${isDark ? "text-white" : "text-gray-900"} `}
//           >
//             Description
//           </h3>

//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={5}
//             className={`w-full rounded-lg p-3 outline-none border

//           ${
//             isDark
//               ? "bg-gray-900 border-gray-600 text-white placeholder-gray-400"
//               : "bg-white border-gray-300 text-gray-900"
//           }
//         `}
//             placeholder="Describe this category..."
//           />
//         </div>

//         {/* category status */}
//         <div
//           className={` border rounded-xl p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} `}
//         >
//           <h3
//             className={`text-lg font-semibold mb-5  ${isDark ? "text-white" : "text-gray-900"}`}
//           >
//             Settings
//           </h3>

//           <CheckBox
//             name="status"
//             label="Active Category"
//             checked={formData.status}
//             onChange={handleChange}
//           />
//         </div>

//         {/*submit button */}
//         <div
//           className={` sticky bottom-0 border-t pt-5 flex justify-end gap-3  ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
//         >
//           <Button
//             type="submit"
//             label={isEditMode ? "Update Category" : "Create Category"}
//             className="w-1/4 text-lg"
//             variant={isDark ? "secondary" : "primary"}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCategory;

import InputField from "../../../components/ui/InputField";
import CheckBox from "../../../components/ui/CheckBox";
import Button from "../../../components/ui/Button";
import { useCreateCategory } from "../../../hooks/admin/category/useCreateCategory";

const CreateCategory = ({ categoryId, onSuccess }) => {
  const { isDark, handleSubmit, formData, isEditMode, handleChange } =
    useCreateCategory({ id: categoryId, onSuccess });

  return (
    <div
      className={`mx-auto w-full min-w-0 max-w-3xl ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {isEditMode ? "Update Category" : "Create Category"}
        </h2>
        <p
          className={`mt-1 text-xs ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Create and manage product categories for your store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Basic Information */}
        <section
          className={`rounded-lg border p-3 sm:p-4 ${
            isDark
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <h3 className="mb-3 text-sm font-semibold">
            Basic Information
          </h3>

          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            <InputField
              label="Category Name"
              name="name"
              value={formData.name}
              handleChange={handleChange}
              placeholder="Beauty"
            />

            <InputField
              label="Slug"
              name="slug"
              value={formData.slug}
              handleChange={handleChange}
              placeholder="beauty"
            />
          </div>
        </section>

        {/* Description */}
        <section
          className={`rounded-lg border p-3 sm:p-4 ${
            isDark
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <h3 className="mb-2 text-sm font-semibold">
            Description
          </h3>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full min-w-0 resize-y rounded-md border p-2.5 text-xs outline-none transition focus:ring-2 focus:ring-indigo-500 ${
              isDark
                ? "border-gray-600 bg-gray-900 text-white placeholder-gray-500"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
            }`}
            placeholder="Describe this category..."
          />
        </section>

        {/* Settings */}
        <section
          className={`rounded-lg border p-3 sm:p-4 ${
            isDark
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <h3 className="mb-2 text-sm font-semibold">
            Settings
          </h3>

          <CheckBox
            name="status"
            label="Active Category"
            checked={formData.status}
            onChange={handleChange}
          />
        </section>

        {/* Submit button */}
        <div
          className={`sticky bottom-0 z-10 flex justify-end gap-2 border-t py-3 ${
            isDark
              ? "border-gray-700 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <Button
            type="submit"
            label={isEditMode ? "Update Category" : "Create Category"}
            className="w-auto min-w-32 px-4 text-sm"
            variant={isDark ? "secondary" : "primary"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
