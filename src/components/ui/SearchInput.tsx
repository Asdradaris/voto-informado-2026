import { Search } from "lucide-react";
import { cn } from "../../lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar candidato...",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/[0.06] bg-[#0D0D20] py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20"
      />
    </div>
  );
}
