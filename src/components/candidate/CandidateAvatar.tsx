import { User } from "lucide-react";
import { cn } from "../../lib/utils";

interface CandidateAvatarProps {
  photo: string;
  name: string;
  partyColor: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-20 w-20",
  xl: "h-28 w-28",
};

const iconSizes = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-10 w-10",
  xl: "h-14 w-14",
};

export function CandidateAvatar({
  photo,
  name,
  partyColor,
  size = "md",
  className,
}: CandidateAvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-2 overflow-hidden",
        sizeClasses[size],
        className
      )}
      style={{ borderColor: partyColor + "60" }}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <User className={cn("text-gray-500", iconSizes[size])} />
      )}
    </div>
  );
}
