type BadgeTone = "danger" | "success" | "warning" | "info" | "neutral";

const tones: Record<BadgeTone, string> = {
  danger: "bg-danger-soft text-danger ring-danger/15",
  success: "bg-success-soft text-success ring-success/15",
  warning: "bg-warning-soft text-warning ring-warning/20",
  info: "bg-brand-blue-soft text-brand-blue-dark ring-brand-blue/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
