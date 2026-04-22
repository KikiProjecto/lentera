export const COLORS = {
  primary: {
    cyan: "#00F5D4",
    pink: "#FF006E",
    purple: "#8338EC",
    yellow: "#FFBE0B",
    orange: "#FF5400",
  },
  dark: {
    950: "#0A0A0F",
    900: "#12121A",
    800: "#1A1A25",
    700: "#252535",
    600: "#353550",
  },
  light: {
    50: "#FAFAFC",
    100: "#F0F0F5",
    200: "#E0E0EA",
    300: "#C8C8D5",
    400: "#A0A0B0",
  },
  guardian: {
    komodo: {
      primary: "#2DD4BF",
      secondary: "#0D9488",
      accent: "#5EEAD4",
      glow: "rgba(45, 212, 191, 0.4)",
    },
    owl: {
      primary: "#A78BFA",
      secondary: "#7C3AED",
      accent: "#C4B5FD",
      glow: "rgba(167, 139, 250, 0.4)",
    },
    orangutan: {
      primary: "#F59E0B",
      secondary: "#D97706",
      accent: "#FCD34D",
      glow: "rgba(245, 158, 11, 0.4)",
    },
    prism: {
      primary: "#06B6D4",
      secondary: "#0891B2",
      accent: "#22D3EE",
      glow: "rgba(6, 182, 212, 0.4)",
    },
    flame: {
      primary: "#EF4444",
      secondary: "#DC2626",
      accent: "#FCA5A5",
      glow: "rgba(239, 68, 68, 0.4)",
    },
  },
  vice: {
    slot: { primary: "#DC2626", secondary: "#991B1B", glow: "rgba(220, 38, 38, 0.3)" },
    rug: { primary: "#7C3AED", secondary: "#5B21B6", glow: "rgba(124, 58, 237, 0.3)" },
    fomo: { primary: "#DB2777", secondary: "#9D174D", glow: "rgba(219, 39, 119, 0.3)" },
    greed: { primary: "#EA580C", secondary: "#C2410C", glow: "rgba(234, 88, 12, 0.3)" },
  },
  status: {
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
} as const;

export const TYPOGRAPHY = {
  display: {
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    sizes: {
      display: "4rem",
      h1: "3rem",
      h2: "2.25rem",
      h3: "1.875rem",
      h4: "1.5rem",
    },
  },
  body: {
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
  },
  game: {
    fontFamily: '"Pixel Code", monospace',
    sizes: {
      xs: "0.625rem",
      sm: "0.75rem",
      base: "0.875rem",
    },
  },
} as const;

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
} as const;

export const BORDER_RADIUS = {
  none: "0",
  sm: "0.25rem",
  DEFAULT: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  full: "9999px",
} as const;

export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  md: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  glow: {
    cyan: "0 0 30px rgba(0, 245, 212, 0.5)",
    pink: "0 0 30px rgba(255, 0, 110, 0.5)",
    purple: "0 0 30px rgba(131, 56, 236, 0.5)",
    yellow: "0 0 30px rgba(255, 190, 11, 0.5)",
  },
} as const;

export const TRANSITIONS = {
  fast: "150ms ease",
  DEFAULT: "300ms ease",
  slow: "500ms ease",
} as const;