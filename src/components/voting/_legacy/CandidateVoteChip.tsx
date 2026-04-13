import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateVoteChipProps {
  candidateId: string;
  name: string;
  party: string;
  partyColor: string;
  photo: string;
  isSelected: boolean;
  disabled: boolean;
  onVote: (candidateId: string) => void;
}

export function CandidateVoteChip({
  candidateId,
  name,
  party,
  partyColor,
  photo,
  isSelected,
  disabled,
  onVote,
}: CandidateVoteChipProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={() => !disabled && onVote(candidateId)}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-xl border p-3 transition-all",
        isSelected
          ? "border-emerald-500/50 bg-emerald-500/10"
          : disabled
            ? "cursor-default border-white/[0.04] bg-white/[0.02] opacity-60"
            : "cursor-pointer border-white/[0.06] bg-white/[0.03] hover:border-amber-500/30 hover:bg-amber-500/5"
      )}
    >
      {/* Photo or initials */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: partyColor + "30", borderColor: partyColor }}
      >
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span style={{ color: partyColor }}>{initials}</span>
        )}
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="text-xs font-medium leading-tight text-gray-200">
          {name.split(" ").slice(-2).join(" ")}
        </p>
        <p className="mt-0.5 text-[10px] text-gray-500">{party}</p>
      </div>

      {/* Selected check */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500"
        >
          <Check className="h-3 w-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}
