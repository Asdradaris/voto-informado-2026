export const theme = {
  colors: {
    bg: {
      primary: "#06060F",
      secondary: "#0A0A1A",
      tertiary: "#111128",
      card: "#0D0D20",
      elevated: "#151530",
    },
    accent: {
      primary: "#F5A623",
      secondary: "#E8940F",
      muted: "#F5A62330",
      glow: "#F5A62315",
    },
    status: {
      clean: "#2ED573",
      warning: "#FFA502",
      danger: "#FF4757",
      critical: "#D63031",
      info: "#70A1FF",
      pending: "#A29BFE",
    },
    text: {
      primary: "#E8E8F0",
      secondary: "#B8B8CC",
      muted: "#666680",
      disabled: "#44445A",
    },
    border: {
      default: "#FFFFFF10",
      hover: "#FFFFFF20",
      active: "#F5A62340",
    },
  },
  fonts: {
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
} as const;

export type Theme = typeof theme;
