export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex justify-between font-semibold ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`opacity-50 ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`max-w-md mx-auto bg-base p-3 border rounded-md ${className}`}
    >
      {children}
    </div>
  );
}
