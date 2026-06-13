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
        "deep-bg": "#CCD0CF",
        "surface-bg": "#9BA8AB",
        "elevated-surface": "#4A5C6A",
        "muted-accent": "#253745",
        "secondary-text": "#11212D",
        "primary-text": "#06141B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
