interface TailwindConfig {
  readonly content: readonly string[];
  readonly theme: {
    readonly extend: {
      readonly colors: Record<string, string>;
      readonly fontFamily: Record<string, readonly string[]>;
    };
  };
  readonly plugins: readonly unknown[];
}

const config: TailwindConfig = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-bg": "#06141B",
        "surface-bg": "#11212D",
        "elevated-surface": "#253745",
        "muted-accent": "#4A5C6A",
        "secondary-text": "#9BA8AB",
        "primary-text": "#CCD0CF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
