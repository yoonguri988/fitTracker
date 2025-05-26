function Button({
  children,
  onClick,
  type = "button",
  name = "",
  value = "",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      name={name}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-btn-sub text-sub px-2 py-1 rounded-xl ${
        !disabled
          ? "bg-btn-main hover:bg-btn-main"
          : "bg-btn-del text-opacity-50"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
