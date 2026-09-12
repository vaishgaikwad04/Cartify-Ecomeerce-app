import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import Dropdown from "../../../components/ui/Dropdown";
import { useCreateCoupon } from "../../../hooks/admin/coupon/useCreateCoupon";

const CreateCoupon = ({ onRefresh, selectedCoupon , setIsModalOpen}) => {
  const { formData, handleChange, handleSubmit, isDark } = useCreateCoupon({
    selectedCoupon,
    onRefresh,
     setIsModalOpen
  });

  const discountTypeOptions = [
    { value: "percentage", label: "Percentage" },
    { value: "fixed", label: "Fixed Amount" },
  ];

  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  return (
    <div
      className={`
        max-w-3xl mx-auto rounded-xl p-6

        ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/* Header */}
      <div
        className={`
          mb-8 pb-4 border-b

          ${isDark ? "border-gray-700" : "border-gray-300"}
        `}
      >
        <h2
          className={`
            text-3xl font-semibold

            ${isDark ? "text-white" : "text-gray-900"}
          `}
        >
          {selectedCoupon ? "Update Coupon" : "Create Coupon"}
        </h2>

        <p
          className={`
            text-sm mt-1

            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          Create discount coupons for customers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Coupon Code"
          type="text"
          name="code"
          value={formData.code}
          handleChange={handleChange}
          placeholder="SAVE10"
        />

        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            label="Discount Type"
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            options={discountTypeOptions}
          />

          <InputField
            label="Discount"
            type="number"
            name="discount"
            value={formData.discount}
            handleChange={handleChange}
            min={0}
          />
        </div>

        <InputField
          label="Minimum Order Amount"
          type="number"
          name="minOrderAmount"
          value={formData.minOrderAmount}
          handleChange={handleChange}
          min={100}
        />

        <InputField
          label="Expiry Date"
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          handleChange={handleChange}
        />

        <Dropdown
          label="Status"
          name="isActive"
          value={String(formData.isActive)}
          onChange={handleChange}
          options={statusOptions}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant={isDark ? "secondary" : "primary"}
            label={selectedCoupon ? "Update Coupon" : "Create Coupon"}
            className="w-1/4"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCoupon;
