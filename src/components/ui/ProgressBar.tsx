import { cn } from "../../lib/utils";
import { getScoreColor } from "../../lib/scoring-engine";

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = "md",
  color,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);
  const barColor = color ?? getScoreColor((value / max) * 100);

  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex-1 overflow-hidden rounded-full bg-white/[0.06]",
          heights[size]
        )}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
      {showLabel && (
        <span className="min-w-[3ch] text-right text-sm font-medium text-gray-300">
          {Math.round(value * 10) / 10}
        </span>
      )}
    </div>
  );
}
