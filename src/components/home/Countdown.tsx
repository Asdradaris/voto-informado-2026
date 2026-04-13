import { motion, AnimatePresence } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";

interface CountdownProps {
  targetDate: Date;
}

interface BlockProps {
  value: number;
  label: string;
  animate?: boolean;
}

function Block({ value, label, animate = false }: BlockProps) {
  const formatted = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1">
      {animate ? (
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.15 }}
            className="font-mono font-bold text-amber-400 tabular-nums"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span
          className="font-mono font-bold text-amber-400 tabular-nums"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}
        >
          {formatted}
        </span>
      )}
      <span className="text-[10px] uppercase tracking-widest text-gray-500">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="font-mono font-bold text-amber-400/40 self-start mt-1"
      style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
    >
      :
    </span>
  );
}

export function Countdown({ targetDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <p className="font-mono text-lg text-amber-400 text-center">
        Segunda vuelta en curso
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      <Block value={days} label="días" />
      <Separator />
      <Block value={hours} label="hrs" />
      <Separator />
      <Block value={minutes} label="min" />
      <Separator />
      <Block value={seconds} label="seg" animate />
    </div>
  );
}
