function Input({ label, errMsg, unitName, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      {unitName && (
        <span className="absolute right-5 top-7 transform -translate-y-5 text-base text-gray-400">
          {unitName}
        </span>
      )}
      {errMsg && <div className="my-2 text-red-400">{errMsg}</div>}
    </div>
  );
}
export default Input;
