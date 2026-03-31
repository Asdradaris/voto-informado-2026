import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { candidates } from "@/data/candidates";
import { CandidateAvatar } from "@/components/candidate/CandidateAvatar";
import { cn } from "@/lib/utils";

interface CandidateSelectProps {
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

export function CandidateSelect({ value, onChange, className }: CandidateSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = candidates.find((c) => c.id === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-lg border border-white/[0.06] bg-[#0D0D20] px-4 py-3 text-left text-sm text-gray-200 outline-none transition-colors hover:border-white/10 focus:border-amber-500/30"
      >
        {selected && (
          <CandidateAvatar
            photo={selected.photo}
            name={selected.name}
            partyColor={selected.party.color}
            size="sm"
            className="!h-7 !w-7"
          />
        )}
        <span className="flex-1 truncate">
          {selected ? `${selected.name} (${selected.party.acronym})` : "Seleccionar candidato"}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-white/10 bg-[#0D0D20] shadow-xl shadow-black/40">
          <div className="max-h-60 overflow-y-auto py-1">
            {candidates.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onChange(c.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                  c.id === value
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-gray-300 hover:bg-white/[0.05]"
                )}
                style={
                  c.id !== value
                    ? { "--hover-bg": c.party.color + "15" } as React.CSSProperties
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (c.id !== value) {
                    e.currentTarget.style.backgroundColor = c.party.color + "10";
                  }
                }}
                onMouseLeave={(e) => {
                  if (c.id !== value) {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
              >
                <CandidateAvatar
                  photo={c.photo}
                  name={c.name}
                  partyColor={c.party.color}
                  size="sm"
                  className="!h-7 !w-7"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.party.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
