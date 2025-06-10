function Input({ label, className, unit, ...props }) {
  const base = `w-full bg-input-bg focus:outline-none placeholder:text-input-tx`;

  return (
    <div className={`${className || "mb-1"}`}>
      {label && (
        <label htmlFor={props.id} className="block mb-1">
          {label}
        </label>
      )}
      <div className="w-full px-2 py-2 rounded-md flex justify-between bg-input-bg">
        <input {...props} autoComplete="off" className={`${base}`} />
        {unit && (
          <div className="text-input-tx basis-3/12 text-right">{unit}</div>
        )}
      </div>
    </div>
  );
}
export default Input;
