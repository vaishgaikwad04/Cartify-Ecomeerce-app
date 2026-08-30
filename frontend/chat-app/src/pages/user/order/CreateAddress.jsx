import React from "react";

import InputField from "../../../components/ui/InputField";
import CheckBox from "../../../components/ui/CheckBox";
import Button from "../../../components/ui/Button";

const CreateAddress = ({
  formData,
  editingId,
  handleChange,
  handleSubmit,
  onCancel,
  isDark,
}) => {
  // =====================================================
  // THEME CLASSES
  // =====================================================

  const cardBg = isDark
    ? "bg-[#111113] border-white/[0.08]"
    : "bg-white border-gray-200";

  const headingText = isDark
    ? "text-white"
    : "text-gray-950";

  const bodyText = isDark
    ? "text-gray-400"
    : "text-gray-500";

  const border = isDark
    ? "border-white/[0.08]"
    : "border-gray-200";

  return (
    <div
      className={`
        w-full
        max-w-4xl
        mx-auto
        rounded-xl
        border
        p-5
        sm:p-6
        lg:p-8
        ${cardBg}
      `}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-7">

        <h2
          className={`
            text-xl
            font-semibold
            tracking-tight
            ${headingText}
          `}
        >
          {editingId
            ? "Update Address"
            : "Add New Address"}
        </h2>

        <p
          className={`
            mt-1.5
            text-sm
            ${bodyText}
          `}
        >
          Enter your delivery details carefully.
        </p>

      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* =================================================
            CONTACT INFORMATION
        ================================================= */}

        <section>

          <div className="mb-4">

            <h3
              className={`
                text-sm
                font-semibold
                ${headingText}
              `}
            >
              Contact Information
            </h3>

            <p
              className={`
                mt-1
                text-xs
                ${bodyText}
              `}
            >
              Provide the details we can use to contact you.
            </p>

          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >

            {/* FULL NAME */}

            <InputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              handleChange={handleChange}
              placeholder="Enter full name"
            />

            {/* PHONE */}

            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              handleChange={handleChange}
              placeholder="Enter phone number"
            />

          </div>
        </section>

        {/* =================================================
            DELIVERY ADDRESS
        ================================================= */}

        <section>

          <div className="mb-4">

            <h3
              className={`
                text-sm
                font-semibold
                ${headingText}
              `}
            >
              Delivery Address
            </h3>

            <p
              className={`
                mt-1
                text-xs
                ${bodyText}
              `}
            >
              Enter the complete address where your order
              should be delivered.
            </p>

          </div>

          <div className="space-y-5">

            {/* ADDRESS LINE */}

            <InputField
              label="Address"
              name="addressLine"
              value={formData.addressLine}
              handleChange={handleChange}
              placeholder="House no, street, area"
            />

            {/* CITY + STATE */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >

              <InputField
                label="City"
                name="city"
                value={formData.city}
                handleChange={handleChange}
                placeholder="Pune"
              />

              <InputField
                label="State"
                name="state"
                value={formData.state}
                handleChange={handleChange}
                placeholder="Maharashtra"
              />

            </div>

            {/* POSTAL CODE + COUNTRY */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >

              <InputField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                handleChange={handleChange}
                placeholder="411057"
              />

              <InputField
                label="Country"
                name="country"
                value={formData.country}
                handleChange={handleChange}
                placeholder="India"
              />

            </div>

          </div>
        </section>

        {/* =================================================
            DEFAULT ADDRESS
        ================================================= */}

        <div
          className={`
            rounded-lg
            border
            px-4
            py-3.5
            ${
              isDark
                ? "border-white/[0.08] bg-white/[0.02]"
                : "border-gray-200 bg-gray-50/70"
            }
          `}
        >

          <CheckBox
            name="isDefault"
            label="Set as default address"
            checked={formData.isDefault}
            onChange={handleChange}
          />

          <p
            className={`
              mt-1
              ml-6
              text-xs
              ${bodyText}
            `}
          >
            This address will be selected automatically
            during checkout.
          </p>

        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div
          className={`
            flex
            flex-col-reverse
            gap-3
            border-t
            pt-6
            sm:flex-row
            sm:justify-end
            ${border}
          `}
        >

          {/* CANCEL */}

          <Button
            type="button"
            label="Cancel"
            onClick={onCancel}
            variant="secondary"
            className="w-full sm:w-auto"
          />

          {/* SAVE / UPDATE */}

          <Button
            type="submit"
            label={
              editingId
                ? "Update Address"
                : "Save Address"
            }
            variant="primary"
            className="w-full sm:w-auto"
          />

        </div>

      </form>
    </div>
  );
};

export default CreateAddress;