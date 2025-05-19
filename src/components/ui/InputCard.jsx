function InputCard({ children, className = "" }) {
  return (
    <div className={`bg-accent p-4 rounded-xl shadow ${className}`}>
      {children}
    </div>
  );
}
export default InputCard;
