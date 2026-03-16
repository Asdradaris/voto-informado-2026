import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-white/[0.06] bg-[#0D0D20] p-5",
        hover &&
          "cursor-pointer transition-all duration-200 hover:border-amber-500/20 hover:bg-[#111128] hover:shadow-lg hover:shadow-amber-500/5",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
