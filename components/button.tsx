import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-blue text-white shadow-md shadow-brand-blue/25 hover:bg-brand-blue-dark focus-visible:ring-brand-blue",
  secondary:
    "bg-white text-brand-navy border border-border hover:bg-brand-blue-soft focus-visible:ring-brand-blue",
  ghost:
    "bg-transparent text-brand-navy hover:bg-brand-blue-soft focus-visible:ring-brand-blue",
  danger:
    "bg-danger text-white hover:bg-red-700 focus-visible:ring-danger",
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  disabled?: boolean;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, disabled, ...rest } = props;
    if (disabled) {
      return (
        <span className={`${classes} opacity-50`} aria-disabled>
          {children}
        </span>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
