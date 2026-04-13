import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

interface SuggestionInputProps {
  canSuggest: boolean;
  isSubmitting: boolean;
  onSubmit: (content: string) => Promise<{ ok: boolean; message?: string }>;
}

export function SuggestionInput({ canSuggest, isSubmitting, onSubmit }: SuggestionInputProps) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Hidden honeypot field
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit() {
    if (!text.trim() || isSubmitting || honeypot) return;

    setError(null);
    const result = await onSubmit(text.trim());

    if (result.ok) {
      setText("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      setError(result.message || "Error al enviar");
    }
  }

  if (!canSuggest) {
    return (
      <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 text-center text-xs text-gray-500">
        Alcanzaste el límite de sugerencias. Gracias por participar.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
      <h3 className="mb-1 text-sm font-semibold text-gray-200">
        ¿Qué te preocupa de esta segunda vuelta?
      </h3>
      <p className="mb-3 text-xs text-gray-500">
        Opcional · Anónimo · Máximo 500 caracteres
      </p>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 500))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="¿Qué te preocupa de esta segunda vuelta?"
          rows={3}
          className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-sm text-gray-200 placeholder-gray-600 outline-none transition-colors focus:border-amber-500/30 focus:bg-white/[0.04]"
        />

        {/* Honeypot - invisible to humans */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <div className="mt-2 flex items-center justify-between">
          <span className={`text-[10px] ${text.length > 450 ? "text-amber-400" : "text-gray-600"}`}>
            {text.length}/500
          </span>

          <button
            onClick={handleSubmit}
            disabled={!text.trim() || isSubmitting}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1.5 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/25 disabled:opacity-40 disabled:hover:bg-amber-500/15"
          >
            {isSubmitting ? (
              <div className="h-3 w-3 animate-spin rounded-full border border-amber-400/30 border-t-amber-400" />
            ) : (
              <Send className="h-3 w-3" />
            )}
            Enviar
          </button>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex items-center gap-2 text-xs text-emerald-400"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Sugerencia enviada. Gracias por participar.
          </motion.div>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
