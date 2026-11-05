
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
  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // STATE
  const [showForm, setShowForm] = useState(false);

  // ADDRESS HOOK
  const {
    addresses = [],
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

  // ADD ADDRESS
  const handleAddAddress = () => {
    resetForm();
    setShowForm(true);
  };

  // EDIT ADDRESS
  const handleEditAddress = (address) => {
    handleEdit(address);
    setShowForm(true);
  };

  // CANCEL FORM
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  // SAVE ADDRESS
  const handleSave = async (e) => {
    await handleSubmit(e);
    setShowForm(false);
  };

  // THEME CLASSES
  const pageBg = isDark ? "bg-[#09090b]" : "bg-[#f7f7f6]";

  const cardBg = isDark
    ? "bg-[#111113] border-white/[0.08]"
    : "bg-white border-gray-200";

  const headingText = isDark ? "text-white" : "text-gray-950";
  const bodyText = isDark ? "text-gray-400" : "text-gray-500";
  const secondaryText = isDark ? "text-gray-300" : "text-gray-700";
  const border = isDark ? "border-white/[0.08]" : "border-gray-200";

  return (
    <main
      className={`
        min-h-screen w-full
        px-3 py-6
        sm:px-5 sm:py-7
        lg:px-8 lg:py-8
        transition-colors duration-300
        ${pageBg}
      `}
    >
      <div className="mx-auto w-full max-w-[1700px]">

        {/* HEADER */}
        <header className={`mb-6 border-b pb-5 sm:mb-7 sm:pb-6 ${border}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className={`text-xl sm:text-2xl font-semibold tracking-tight ${headingText}`}>
                My Addresses
              </h1>

              <p className={`mt-1 text-xs sm:text-sm ${bodyText}`}>
                Manage your shipping and delivery addresses.
              </p>
            </div>

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

        {/* CREATE / EDIT FORM */}
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

        {/* ADDRESS CONTENT */}
        {!showForm && (
          <>
            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`
                      h-56 animate-pulse rounded-xl border
                      ${cardBg}
                    `}
                  />
                ))}
              </div>
            ) : addresses.length === 0 ? (

              /* EMPTY STATE */
              <div
                className={`
                  rounded-xl border
                  px-4 py-14 sm:px-6 sm:py-16
                  text-center
                  ${cardBg}
                `}
              >
                <div
                  className={`
                    mx-auto flex h-12 w-12 items-center justify-center
                    rounded-xl
                    ${isDark ? "bg-white/[0.05]" : "bg-gray-100"}
                  `}
                >
                  <FiMapPin
                    size={22}
                    className={isDark ? "text-gray-500" : "text-gray-400"}
                  />
                </div>

                <h2 className={`mt-4 text-base font-semibold ${headingText}`}>
                  No addresses saved
                </h2>

                <p className={`mx-auto mt-2 max-w-md text-xs sm:text-sm ${bodyText}`}>
                  Add a delivery address to make your checkout process faster and easier.
                </p>

                <div className="mt-5">
                  <Button
                    label="Add Your First Address"
                    icon={<FiPlus />}
                    onClick={handleAddAddress}
                    variant={isDark ? "secondary" : "primary"}
                  />
                </div>
              </div>

            ) : (

              /* ADDRESS LIST */
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {addresses.map((address) => (
                  <article
                    key={address._id}
                    className={`
                      flex min-w-0 flex-col
                      rounded-xl border
                      p-4 sm:p-5
                      transition-colors duration-200
                      ${cardBg}
                    `}
                  >

                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between gap-3">

                      <div
                        className={`
                          flex h-10 w-10 shrink-0 items-center justify-center
                          rounded-lg
                          ${
                            isDark
                              ? "bg-white/[0.05] text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        <FiMapPin size={18} />
                      </div>

                      {address.isDefault && (
                        <span
                          className="
                            inline-flex shrink-0 items-center gap-1.5
                            rounded-full border border-emerald-500/20
                            bg-emerald-500/10
                            px-2.5 py-1
                            text-[10px] font-medium text-emerald-600
                            dark:text-emerald-400
                          "
                        >
                          <FiCheck size={12} />
                          Default
                        </span>
                      )}
                    </div>

                    {/* ADDRESS DETAILS */}
                    <div className="mt-4 flex-1">

                      <h3 className={`text-sm sm:text-base font-semibold ${headingText}`}>
                        {address.fullName}
                      </h3>

                      <p className={`mt-1 text-xs sm:text-sm ${secondaryText}`}>
                        {address.phone}
                      </p>

                      <p className={`mt-3 text-xs sm:text-sm leading-6 break-words ${bodyText}`}>
                        {address.addressLine}
                        <br />
                        {address.city}, {address.state}
                        <br />
                        {address.postalCode}, {address.country}
                      </p>
                    </div>

                    {/* CARD ACTIONS */}
                    <div
                      className={`
                        mt-5 flex flex-wrap items-center justify-between
                        gap-2 border-t pt-3
                        ${border}
                      `}
                    >

                      <div className="flex items-center gap-2">

                        {/* EDIT */}
                        <button
                          type="button"
                          onClick={() => handleEditAddress(address)}
                          className={`
                            inline-flex items-center gap-1.5
                            rounded-lg border px-2.5 py-2
                            text-xs font-medium
                            transition-colors duration-200
                            ${
                              isDark
                                ? "border-gray-700 text-gray-300 hover:bg-white/[0.05] hover:text-white"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }
                          `}
                        >
                          <FiEdit2 size={13} />
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() => handleDelete(address._id)}
                          className={`
                            inline-flex items-center gap-1.5
                            rounded-lg border px-2.5 py-2
                            text-xs font-medium
                            transition-colors duration-200
                            ${
                              isDark
                                ? "border-red-900/40 text-red-400 hover:bg-red-950/30"
                                : "border-red-100 text-red-500 hover:bg-red-50"
                            }
                          `}
                        >
                          <FiTrash2 size={13} />
                          Delete
                        </button>
                      </div>

                      {/* SET DEFAULT */}
                      {!address.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(address._id)}
                          className={`
                            inline-flex items-center gap-1.5
                            rounded-lg px-2 py-2
                            text-xs font-medium
                            transition-colors duration-200
                            ${
                              isDark
                                ? "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }
                          `}
                        >
                          <FiCheck size={13} />
                          <span>Set default</span>
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
