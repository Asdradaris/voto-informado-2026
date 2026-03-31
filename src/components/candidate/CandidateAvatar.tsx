import { useState } from "react";
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

const initialsSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-xl",
  xl: "text-2xl",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function CandidateAvatar({
  photo,
  name,
  partyColor,
  size = "md",
  className,
}: CandidateAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = photo && !imgError;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-2 overflow-hidden",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: partyColor + "60",
        backgroundColor: showImage ? undefined : partyColor + "20",
      }}
    >
      {showImage ? (
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className={cn("font-bold", initialsSizes[size])}
          style={{ color: partyColor }}
        >
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}
