function Input({ label, className, unit, ...props }) {
  return (
    <div className={`${className || ""}`}>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        {...props}
        className={`w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-btn-main`}
      />
    </div>
  );
}
export default Input;
