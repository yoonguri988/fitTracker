function Card({ children, className = "" }) {
  return (
    <div className={`bg-base p-3 mb-2 border rounded-md ${className}`}>
      {children}
    </div>
  );
}
export default Card;
