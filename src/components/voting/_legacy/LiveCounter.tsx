import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface LiveCounterProps {
  value: number;
  className?: string;
}

export function LiveCounter({ value, className = "" }: LiveCounterProps) {
  const spring = useSpring(0, { stiffness: 300, damping: 30 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString("es-PE")
  );
  const prevValue = useRef(value);

  useEffect(() => {
    spring.set(value);
    prevValue.current = value;
  }, [value, spring]);

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  );
}
