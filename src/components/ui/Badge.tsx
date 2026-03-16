import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "critical" | "info" | "pending";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-gray-300",
  success: "bg-emerald-500/15 text-emerald-400",
  warning: "bg-amber-500/15 text-amber-400",
  danger: "bg-red-500/15 text-red-400",
  critical: "bg-red-700/20 text-red-500",
  info: "bg-blue-500/15 text-blue-400",
  pending: "bg-purple-500/15 text-purple-400",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
