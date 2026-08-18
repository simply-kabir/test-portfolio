// src/lib/design.ts

export const typography = {
  hero:
    "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight leading-[1.15]",

  h1:
    "text-4xl lg:text-5xl font-semibold tracking-tight",

  h2:
    "text-3xl lg:text-4xl font-semibold tracking-tight",

  h3:
    "text-2xl font-semibold",

  body: 
    "text-base leading-8 text-text-secondary",

  bodyLarge:
    "text-lg leading-9 text-text-secondary",

  small: 
    "text-sm text-text-secondary",

  overline: 
    "text-[11px] uppercase tracking-[0.35em] text-accent/70 font-normal",

};

export const spacing = {
  section: "py-32",

  container: "px-6 lg:px-10",

  card: "p-8",
};

export const radius = {
  sm: "rounded-md",

  md: "rounded-xl",

  lg: "rounded-2xl",

  xl: "rounded-3xl",

  full: "rounded-full",
};

export const colors = {
  text: {
    primary: "text-text-primary",

    secondary: "text-text-secondary",

    muted: "text-text-secondary",
  },

  surface: {
    glass: "bg-white/[0.03]",

    elevated: "bg-white/[0.05]",
  },

  border: {
    subtle: "border-white/10",

    strong: "border-white/20",
  },

  accent: {
    text: "text-accent",

    background: "bg-accent/10",
    
    border: "border-accent/40",
},
};

export const animation = {
  fast: "duration-150",

  normal: "duration-300",

  slow: "duration-500",
};