function Button({
  children,
  onClick,
  type = "button",
  name = "",
  value = "",
  className = "",
}) {
  return (
    <button
      type={type}
      name={name}
      value={value}
      onClick={onClick}
      className={`bg-btn-sub text-sub px-4 py-2 rounded-xl hover:bg-btn-main ${className} `}
    >
      {children}
    </button>
  );
}

export default Button;
