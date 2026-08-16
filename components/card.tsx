export function Card({
  children,
  className = "",
  padding = true,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-border/80 bg-surface shadow-card ${
        padding ? "p-5 sm:p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
