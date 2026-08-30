import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import Button from "../../../components/ui/Button";

import {
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiCheck,
} from "react-icons/fi";

import { useAddress } from "../../../hooks/user/useAddress";
import CreateAddress from "./CreateAddress";

const Address = () => {
  // =====================================================
  // THEME
  // =====================================================

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  // =====================================================
  // STATE
  // =====================================================

  const [showForm, setShowForm] = useState(false);

  // =====================================================
  // ADDRESS HOOK
  // =====================================================

  const {
    addresses,
    loading,
    formData,
    editingId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleSetDefault,
    resetForm,
  } = useAddress();

  // =====================================================
  // ADD ADDRESS
  // =====================================================

  const handleAddAddress = () => {
    resetForm();
    setShowForm(true);
  };

  // =====================================================
  // EDIT ADDRESS
  // =====================================================

  const handleEditAddress = (address) => {
    handleEdit(address);
    setShowForm(true);
  };

  // =====================================================
  // CANCEL FORM
  // =====================================================

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  // =====================================================
  // SAVE ADDRESS
  // =====================================================

  const handleSave = async (e) => {
    await handleSubmit(e);
    setShowForm(false);
  };

  // =====================================================
  // THEME CLASSES
  // =====================================================

  const pageBg = isDark
    ? "bg-[#09090b]"
    : "bg-[#f7f7f6]";

  const cardBg = isDark
    ? "bg-[#111113] border-white/[0.08]"
    : "bg-white border-gray-200";

  const headingText = isDark
    ? "text-white"
    : "text-gray-950";

  const bodyText = isDark
    ? "text-gray-400"
    : "text-gray-500";

  const secondaryText = isDark
    ? "text-gray-300"
    : "text-gray-700";

  const border = isDark
    ? "border-white/[0.08]"
    : "border-gray-200";

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <main
      className={`
        min-h-screen
        px-4
        py-8
        transition-colors
        duration-300
        sm:px-6
        lg:px-8
        ${pageBg}
      `}
    >
      <div className="mx-auto max-w-[1800px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className={`
            mb-8
            border-b
            pb-6
            ${border}
          `}
        >
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* HEADER TEXT */}

            <div>
              <h1
                className={`
                  text-2xl
                  font-semibold
                  tracking-tight
                  ${headingText}
                `}
              >
                My Addresses
              </h1>

              <p
                className={`
                  mt-1
                  text-sm
                  ${bodyText}
                `}
              >
                Manage your shipping and delivery addresses.
              </p>
            </div>

            {/* ADD BUTTON */}

            {!showForm && (
              <div className="w-full sm:w-auto">
                <Button
                  label="Add Address"
                  icon={<FiPlus />}
                  onClick={handleAddAddress}
                  variant={isDark ? "secondary" : "primary"}
                  className="w-full sm:w-auto"
                />
              </div>
            )}
          </div>
        </header>

        {/* =================================================
            CREATE / EDIT FORM
        ================================================= */}

        {showForm && (
          <CreateAddress
            formData={formData}
            editingId={editingId}
            handleChange={handleChange}
            handleSubmit={handleSave}
            onCancel={handleCancel}
            isDark={isDark}
          />
        )}

        {/* =================================================
            ADDRESS CONTENT
        ================================================= */}

        {!showForm && (
          <>
            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (
              <div className="space-y-5">

                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className={`
                      h-52
                      animate-pulse
                      rounded-xl
                      border
                      ${cardBg}
                    `}
                  />
                ))}

              </div>
            ) : addresses.length === 0 ? (

              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div
                className={`
                  rounded-xl
                  border
                  px-6
                  py-20
                  text-center
                  ${cardBg}
                `}
              >
                {/* ICON */}

                <div
                  className={`
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-xl
                    ${
                      isDark
                        ? "bg-white/[0.05]"
                        : "bg-gray-100"
                    }
                  `}
                >
                  <FiMapPin
                    size={24}
                    className={
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                  />
                </div>

                {/* TITLE */}

                <h2
                  className={`
                    mt-5
                    text-lg
                    font-semibold
                    ${headingText}
                  `}
                >
                  No addresses saved
                </h2>

                {/* DESCRIPTION */}

                <p
                  className={`
                    mx-auto
                    mt-2
                    max-w-md
                    text-sm
                    ${bodyText}
                  `}
                >
                  Add a delivery address to make your
                  checkout process faster and easier.
                </p>

                {/* BUTTON */}

                <div className="mt-6">
                  <Button
                    label="Add Your First Address"
                    icon={<FiPlus />}
                    onClick={handleAddAddress}
                    variant={isDark ? "secondary" : "primary"}
                  />
                </div>
              </div>

            ) : (

              /* =================================================
                 ADDRESS LIST
              ================================================= */

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >

                {addresses.map((address) => (

                  <article
                    key={address._id}
                    className={`
                      relative
                      flex
                      min-h-[260px]
                      flex-col
                      rounded-xl
                      border
                      p-5
                      transition-all
                      duration-200
                      ${cardBg}
                    `}
                  >

                    {/* =================================================
                        TOP SECTION
                    ================================================= */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      {/* ADDRESS ICON */}

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          ${
                            isDark
                              ? "bg-white/[0.05] text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        <FiMapPin size={19} />
                      </div>

                      {/* DEFAULT BADGE */}

                      {address.isDefault && (
                        <span
                          className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-1
                            rounded-full
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            text-emerald-600
                            dark:text-emerald-400
                          "
                        >
                          <FiCheck size={12} />
                          Default
                        </span>
                      )}
                    </div>

                    {/* =================================================
                        ADDRESS INFORMATION
                    ================================================= */}

                    <div className="mt-5">

                      {/* NAME */}

                      <h3
                        className={`
                          text-base
                          font-semibold
                          ${headingText}
                        `}
                      >
                        {address.fullName}
                      </h3>

                      {/* PHONE */}

                      <p
                        className={`
                          mt-1
                          text-sm
                          ${secondaryText}
                        `}
                      >
                        {address.phone}
                      </p>

                      {/* ADDRESS */}

                      <p
                        className={`
                          mt-3
                          text-sm
                          leading-6
                          ${bodyText}
                        `}
                      >
                        {address.addressLine}
                        <br />

                        {address.city},{" "}
                        {address.state}
                        <br />

                        {address.postalCode},{" "}
                        {address.country}
                      </p>
                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div
                      className={`
                        mt-auto
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-3
                        border-t
                        pt-4
                        ${border}
                      `}
                    >

                      {/* LEFT ACTIONS */}

                      <div className="flex flex-wrap items-center gap-2">

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            handleEditAddress(address)
                          }
                          className={`
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            px-3
                            py-2
                            text-sm
                            font-medium
                            transition-all
                            duration-200
                            ${
                              isDark
                                ? `
                                  border-gray-700
                                  text-gray-300
                                  hover:border-gray-600
                                  hover:bg-white/[0.04]
                                  hover:text-white
                                `
                                : `
                                  border-gray-200
                                  text-gray-600
                                  hover:border-gray-300
                                  hover:bg-gray-50
                                  hover:text-gray-900
                                `
                            }
                          `}
                        >
                          <FiEdit2
                            size={15}
                            className="
                              transition-transform
                              duration-200
                              group-hover:scale-110
                            "
                          />

                          <span>Edit</span>
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(address._id)
                          }
                          className={`
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            px-3
                            py-2
                            text-sm
                            font-medium
                            transition-all
                            duration-200
                            ${
                              isDark
                                ? `
                                  border-red-900/40
                                  text-red-400
                                  hover:border-red-800
                                  hover:bg-red-950/30
                                  hover:text-red-300
                                `
                                : `
                                  border-red-100
                                  text-red-500
                                  hover:border-red-200
                                  hover:bg-red-50
                                  hover:text-red-600
                                `
                            }
                          `}
                        >
                          <FiTrash2
                            size={15}
                            className="
                              transition-transform
                              duration-200
                              group-hover:scale-110
                            "
                          />

                          <span>Delete</span>
                        </button>
                      </div>

                      {/* =================================================
                          SET DEFAULT
                      ================================================= */}

                      {!address.isDefault && (
                        <button
                          type="button"
                          onClick={() =>
                            handleSetDefault(
                              address._id
                            )
                          }
                          className={`
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            px-2
                            py-2
                            text-sm
                            font-medium
                            transition-all
                            duration-200
                            ${
                              isDark
                                ? `
                                  text-gray-400
                                  hover:bg-white/[0.04]
                                  hover:text-white
                                `
                                : `
                                  text-gray-500
                                  hover:bg-gray-100
                                  hover:text-gray-900
                                `
                            }
                          `}
                        >
                          <FiCheck
                            size={15}
                            className="
                              transition-transform
                              duration-200
                              group-hover:scale-110
                            "
                          />

                          <span>
                            Set as default
                          </span>
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Address;