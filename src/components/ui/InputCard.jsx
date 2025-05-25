function InputCard({ children, onSubmit, className = "" }) {
  return (
    <form
      method="post"
      onSubmit={onSubmit}
      className={`bg-base-point p-4 rounded-xl shadow ${className}`}
    >
      {children}
    </form>
  );
}
export default InputCard;
