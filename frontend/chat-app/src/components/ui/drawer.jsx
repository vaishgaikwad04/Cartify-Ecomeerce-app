const Drawer = ({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "w-full sm:w-[400px]",
}) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* BACKDROP */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* DRAWER */}
      <div
        className={`
          absolute
          top-0
          h-full
          bg-white
          shadow-2xl
          flex
          flex-col
          transition-transform
          duration-300

          ${width}

          ${position === "right" ? "right-0" : "left-0"}

          ${
            isOpen
              ? "translate-x-0"
              : position === "right"
                ? "translate-x-full"
                : "-translate-x-full"
          }
        `}
      >
        <div className="flex flex-col h-full min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;