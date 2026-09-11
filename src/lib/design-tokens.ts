/** Martha's Healing Touch — Design System Tokens */

export const colors = {
  ivory: {
    50: "#FFFEF9",
    100: "#FAF8F5",
    200: "#F5F1EB",
  },
  sage: {
    100: "#D4DDD0",
    300: "#A8B5A0",
    500: "#8FA088",
    700: "#6B7F63",
    900: "#4A5A44",
  },
  gold: {
    200: "#E8D5A3",
    400: "#C9A962",
    600: "#B8943F",
    800: "#96782E",
  },
  charcoal: {
    700: "#3D3D3D",
    800: "#2C2C2C",
    900: "#1A1A1A",
  },
  rose: {
    200: "#E8D4D4",
    400: "#C4A5A5",
    600: "#A88888",
  },
  eucalyptus: {
    300: "#A8C4A5",
    500: "#8BA888",
    700: "#6E8F6B",
  },
} as const;

export const fonts = {
  serif: "var(--font-cormorant)",
  sans: "var(--font-dm-sans)",
} as const;

export const shadows = {
  soft: "0 4px 24px rgba(26, 26, 26, 0.06)",
  card: "0 8px 40px rgba(26, 26, 26, 0.08)",
  glow: "0 0 40px rgba(201, 169, 98, 0.25)",
} as const;
