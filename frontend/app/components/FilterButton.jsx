const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 m-1 rounded-3xl cursor-pointer ${
        isActive ? "bg-teal-600 text-white" : "bg-gray-800 text-gray-200"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;