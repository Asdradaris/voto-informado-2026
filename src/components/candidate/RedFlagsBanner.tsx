import { AlertTriangle, ShieldAlert, AlertOctagon } from "lucide-react";
import type { RedFlag } from "../../types";

const severityConfig = {
  critico: { icon: AlertOctagon, bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400" },
  alto: { icon: ShieldAlert, bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" },
  medio: { icon: AlertTriangle, bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
};

interface RedFlagsBannerProps {
  flags: RedFlag[];
}

export function RedFlagsBanner({ flags }: RedFlagsBannerProps) {
  if (flags.length === 0) return null;

  return (
    <div className="space-y-2">
      {flags.map((flag, i) => {
        const config = severityConfig[flag.severity];
        const Icon = config.icon;
        return (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-lg border ${config.border} ${config.bg} p-3`}
          >
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.text}`} />
            <div>
              <p className={`text-sm font-medium ${config.text}`}>
                {flag.title}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                {flag.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
