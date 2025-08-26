export default function FilterButton({ label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full ${
        active ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {label}
    </button>
  );
}