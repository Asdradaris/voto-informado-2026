export function VSSeparator() {
  return (
    <>
      {/* Desktop: vertical line with VS */}
      <div className="hidden md:flex flex-col items-center justify-center gap-3 px-2">
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <span
          className="font-bold text-amber-400 select-none"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            textShadow: "0 0 24px #F5A62350",
          }}
        >
          VS
        </span>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Mobile: horizontal with VS */}
      <div className="flex md:hidden items-center gap-4 py-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span
          className="font-bold text-amber-400 select-none"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "2rem",
            textShadow: "0 0 20px #F5A62340",
          }}
        >
          VS
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </>
  );
}
