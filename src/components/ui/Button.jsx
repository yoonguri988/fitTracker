function Button({
  children,
  onClick,
  type = "button",
  name = "",
  value = "",
  disabled = false,
  className = "",
}) {
  const base = `w-full px-4 py-2 rounded-xl`;
  const variant = disabled
    ? "bg-btn-del text-opacity-50"
    : type === "submit"
    ? "bg-btn-main hover:bg-btn-main/90"
    : "bg-btn-sub hover:bg-btn-sub/90";
  return (
    <button
      type={type}
      name={name}
      value={value}
      onClick={onClick}
      aria-disabled={disabled}
      className={`${base} ${variant} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
