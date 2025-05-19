function Card({ children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow ${className}`}>
      {children}
    </div>
  );
}
export default Card;
