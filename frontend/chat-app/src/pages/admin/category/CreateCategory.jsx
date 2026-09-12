import InputField from "../../../components/ui/InputField";
import CheckBox from "../../../components/ui/CheckBox";
import Button from "../../../components/ui/Button";
import { useCreateCategory } from "../../../hooks/admin/category/useCreateCategory";

const CreateCategory = ({ categoryId, onSuccess }) => {
  const { isDark, handleSubmit, formData, isEditMode, handleChange } =
    useCreateCategory({ id: categoryId, onSuccess });

  return (
    <div
      className={`
    w-full max-w-5xl mx-auto 
    ${isDark ? "text-white" : "text-gray-900"}
  `}
    >
      {/* Header */}

      <div className="mb-8">
        <h2
          className={`
        text-3xl font-bold p-2

        ${isDark ? "text-white" : "text-gray-900"}
      `}
        >
          {isEditMode ? "Update Category" : "Create Category"}
        </h2>

        <p
          className={`
        mt-2 ml-2

        ${isDark ? "text-gray-400" : "text-gray-500"}
      `}
        >
          Create and manage product categories for your store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}

        <div
          className={`
        border rounded-xl p-6

        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      `}
        >
          <h3
            className={`
          text-lg font-semibold mb-5
          ${isDark ? "text-white" : "text-gray-900"}
        `}
          >
            Basic Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
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
        </div>

        {/* Description */}

        <div
          className={`
        border rounded-xl p-6

        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      `}
        >
          <h3
            className={`
          text-lg font-semibold mb-5
          ${isDark ? "text-white" : "text-gray-900"}
        `}
          >
            Description
          </h3>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className={`
          w-full rounded-lg p-3 outline-none border

          ${
            isDark
              ? "bg-gray-900 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900"
          }
        `}
            placeholder="Describe this category..."
          />
        </div>

        {/* Settings */}

        <div
          className={`
        border rounded-xl p-6

        ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      `}
        >
          <h3
            className={`
          text-lg font-semibold mb-5
          ${isDark ? "text-white" : "text-gray-900"}
        `}
          >
            Settings
          </h3>

          <CheckBox
            name="status"
            label="Active Category"
            checked={formData.status}
            onChange={handleChange}
          />
        </div>

        {/* Footer */}

        <div
          className={`
        sticky bottom-0 border-t pt-5 flex justify-end gap-3

        ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
      `}
        >
          <Button
            type="submit"
            label={isEditMode ? "Update Category" : "Create Category"}
            className="w-1/4 text-lg"
            variant={isDark ? "secondary" : "primary"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
