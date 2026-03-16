import { useState, useEffect } from "react";
import { ELECTION_DATE } from "../../config/constants";

export function CountdownTimer() {
  const [days, setDays] = useState(() => getDays());

  useEffect(() => {
    const interval = setInterval(() => setDays(getDays()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-400">
      <span className="font-mono text-base font-bold">{days}</span>
      <span className="text-amber-400/70">
        {days === 1 ? "día" : "días"} para la primera vuelta
      </span>
    </div>
  );
}

function getDays(): number {
  const target = new Date(ELECTION_DATE);
  const now = new Date();
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));
}
