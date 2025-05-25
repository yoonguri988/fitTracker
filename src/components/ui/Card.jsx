function Card({ children, className = "" }) {
  return (
    <div className={`bg-base p-4 rounded-xl ${className}`}>{children}</div>
  );
}
export default Card;
