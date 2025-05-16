function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}
export default Input;
