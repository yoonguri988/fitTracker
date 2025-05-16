function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
