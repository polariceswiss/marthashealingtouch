import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-600 text-ivory-50 hover:bg-gold-800 shadow-glow border border-gold-400/30",
  secondary:
    "bg-transparent text-ivory-50 border border-ivory-50/40 hover:bg-ivory-50/10 backdrop-blur-sm",
  ghost: "bg-transparent text-charcoal-800 hover:bg-sage-100/50",
  outline:
    "bg-transparent text-charcoal-800 border border-sage-300 hover:border-sage-500 hover:bg-sage-100/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm tracking-wide",
  lg: "px-9 py-4 text-base tracking-wider",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
