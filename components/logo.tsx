import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  href?: string | false;
  showWordmark?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { box: "h-8 w-8", img: 32 },
  md: { box: "h-10 w-10", img: 40 },
  lg: { box: "h-12 w-12", img: 48 },
} as const;

export function Logo({
  variant = "dark",
  href = "/home",
  showWordmark = true,
  className = "",
  size = "md",
}: LogoProps) {
  const dim = sizes[size];

  const mark = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`relative ${dim.box} shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ${
          variant === "light" ? "ring-white/20" : "ring-black/5"
        }`}
      >
        <Image
          src="/saspac-logo.png"
          alt="Saspac"
          width={dim.img}
          height={dim.img}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={`text-[1.05rem] font-bold tracking-tight ${
              variant === "light" ? "text-white" : "text-brand-navy"
            }`}
          >
            Saspac
          </span>
          <span
            className={`mt-1 text-[0.68rem] font-medium tracking-[0.14em] uppercase ${
              variant === "light" ? "text-brand-blue-muted" : "text-muted"
            }`}
          >
            Parent Portal
          </span>
        </span>
      ) : null}
    </span>
  );

  if (href === false) return mark;

  return (
    <Link
      href={href}
      className="rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      {mark}
    </Link>
  );
}
