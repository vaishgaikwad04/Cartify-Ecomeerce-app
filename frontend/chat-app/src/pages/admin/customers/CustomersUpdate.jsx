import InputField from "../../../components/ui/InputField";
import { useUpdateCustomer } from "../../../hooks/admin/customer/useCreateCustomer";

const CustomersUpdate = ({ user, onClose, onRefresh }) => {
  const {
    // Theme
    isDark,

    // Form
    formData,
    handleChange,
    handleSubmit,

    // Messages
    error,
    success,

    // Loading
    loading,
  } = useUpdateCustomer({ user, onClose, onRefresh });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className={`
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border
          shadow-2xl

          ${
            isDark
              ? "bg-gray-900 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }
        `}
      >
        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          className={`
            absolute
            right-5
            top-5
            h-9
            w-9
            rounded-lg
            text-xl
            transition

            ${
              isDark
                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-black"
            }
          `}
        >
          ×
        </button>

        {/* HEADER */}
        <div
          className={`
            border-b
            px-6
            py-5

            ${isDark ? "border-gray-700" : "border-gray-200"}
          `}
        >
          <h2 className="text-xl font-semibold">Update Customer</h2>
          <p
            className={`
              mt-1
              text-sm

              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Update customer information and contact details.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* ERROR */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* BASIC INFORMATION */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Basic Information</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                type="text"
                name="name"
                value={formData.name}
                handleChange={handleChange}
                label="Full Name"
              />

              <InputField
                type="email"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                label="Email"
              />

              <InputField
                type="text"
                name="phone"
                value={formData.phone}
                handleChange={handleChange}
                label="Phone"
              />
            </div>
          </div>

          {/* ADDRESS */} 
          <div>
            <h3 className="mb-4 text-sm font-semibold">Address</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <InputField
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  handleChange={handleChange}
                  label="Address"
                />
              </div>

              <InputField
                type="text"
                name="city"
                value={formData.city}
                handleChange={handleChange}
                label="City"
              />

              <InputField
                type="text"
                name="state"
                value={formData.state}
                handleChange={handleChange}
                label="State"
              />

              <InputField
                type="text"
                name="postalCode"
                value={formData.postalCode}
                handleChange={handleChange}
                label="Postal Code"
              />

              <InputField
                type="text"
                name="country"
                value={formData.country}
                handleChange={handleChange}
                label="Country"
              />
            </div>
          </div>

          {/* BUTTONS */}

          <div
            className={`
              flex
              justify-end
              gap-3
              border-t
              pt-5

              ${isDark ? "border-gray-700" : "border-gray-200"}
            `}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`
                rounded-lg
                border
                px-5
                py-2.5
                text-sm
                font-medium
                transition

                ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-lg
                bg-black
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-800
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Updating..." : "Update Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomersUpdate;
