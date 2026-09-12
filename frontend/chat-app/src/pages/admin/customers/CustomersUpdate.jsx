
import InputField from "../../../components/ui/InputField";
import Modal from "../../../components/ui/Modal";
import { useUpdateCustomer } from "../../../hooks/admin/customer/useCreateCustomer";
import Button from "../../../components/ui/Button";

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
    <Modal
      isOpen={!!user}
      onClose={onClose}
      className="max-w-2xl max-h-[90vh]"
    >
      {/* HEADER */}
      <div
        className={`
          border-b
          px-6
          py-5
          ${isDark ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <h2 className="text-xl font-semibold">
          Update Customer
        </h2>

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
      <form onSubmit={handleSubmit} className="space-y-5 p-6">

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

        {/* BASIC INFORMATION BOX */}
        <section
          className={`
            rounded-xl
            border
            p-5
            ${
              isDark
                ? "border-gray-700 bg-gray-900/50"
                : "border-gray-200 bg-gray-50/50"
            }
          `}
        >
          <div className="mb-5">
            <h3 className="text-sm font-semibold">
              Basic Information
            </h3>

            <p
              className={`
                mt-1
                text-xs
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Enter the customer's basic personal and contact
              information.
            </p>
          </div>

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
        </section>

        {/* ADDRESS INFORMATION BOX */}
        <section
          className={`
            rounded-xl
            border
            p-5
            ${
              isDark
                ? "border-gray-700 bg-gray-900/50"
                : "border-gray-200 bg-gray-50/50"
            }
          `}
        >
          <div className="mb-5">
            <h3 className="text-sm font-semibold">
              Address Information
            </h3>

            <p
              className={`
                mt-1
                text-xs
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Enter the customer's current address and location
              details.
            </p>
          </div>

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
        </section>

        {/* ACTIONS */}
        <div
          className={`
            flex
            justify-end
            border-t
            pt-5
            ${isDark ? "border-gray-700" : "border-gray-200"}
          `}
        >
          <Button
            type="submit"
            disabled={loading}
            label={loading ? "Updating..." : "Update Customer"}
            variant={isDark?  "secondary" :"primary"}
            className="
              shadow-sm
              transition
              hover:shadow
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          />
            
          
        </div>
      </form>
    </Modal>
  );
};

export default CustomersUpdate;
