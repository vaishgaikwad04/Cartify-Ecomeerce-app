import { FiSearch } from "react-icons/fi";

const SearchModal = ({
  isOpen,
  searchTerm,
  results,
  onSearch,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[100]">
      {/* TOP BAR */}
      <div className="bg-white w-full px-6 py-4 flex justify-center">
        <div className="relative w-full max-w-5xl flex items-center">
          <FiSearch className="absolute left-4 text-gray-400 text-xl" />

          <input
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 py-3 border-b outline-none"
          />

          <button
            onClick={onClose}
            className="absolute right-4 text-xl text-gray-500"
          >
            ✕
          </button>
        </div>
      </div>

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="bg-white w-full max-h-[400px] overflow-y-auto mx-24">
          {results.map((item) => (
            <div
              key={item._id}
              onClick={() => onSelect(item)}
              className="px-2 py-3 flex gap-3 cursor-pointer hover:bg-gray-50"
            >
              <img
                src={item.images?.[0]}
                className="w-10 h-10 object-cover rounded"
              />
              <p className="font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchModal;