import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import type { CitizenSuggestion } from "@/types";

interface SuggestionFeedProps {
  suggestions: CitizenSuggestion[];
  isLoading: boolean;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return "hace un momento";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  return `hace ${Math.floor(diff / 86400)}d`;
}

export function SuggestionFeed({ suggestions, isLoading }: SuggestionFeedProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? suggestions : suggestions.slice(0, 5);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-3 w-3/4 rounded bg-white/[0.05]" />
              <div className="h-3 w-1/2 rounded bg-white/[0.03]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
        <MessageCircle className="mx-auto mb-2 h-6 w-6 text-gray-600" />
        <p className="text-xs text-gray-500">
          Aún no hay sugerencias. Sé el primero en compartir tu opinión.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-200">
        <MessageCircle className="h-4 w-4 text-amber-400/60" />
        Qué dice la gente
      </h3>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visible.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-3"
            >
              <p className="text-sm leading-relaxed text-gray-300">
                "{suggestion.content}"
              </p>
              <p className="mt-1.5 text-[10px] text-gray-600">
                — {timeAgo(suggestion.createdAt)}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {suggestions.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex w-full items-center justify-center gap-1 text-xs text-amber-400/60 transition-colors hover:text-amber-400"
        >
          {showAll ? "Ver menos" : `Ver más sugerencias (${suggestions.length})`}
          <ChevronDown
            className={`h-3 w-3 transition-transform ${showAll ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}
