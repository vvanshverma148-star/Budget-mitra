import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#65dca4",
        "on-primary-fixed-variant": "#364763",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "surface-container": "#efedf0",
        "on-tertiary-fixed": "#002113",
        "tertiary": "#000301",
        "secondary": "#00687b",
        "on-surface": "#1b1b1e",
        "error": "#ba1a1a",
        "surface": "#fbf9fb",
        "primary-container": "#0a1d37",
        "surface-tint": "#4e5f7c",
        "inverse-on-surface": "#f2f0f3",
        "on-primary": "#ffffff",
        "on-secondary-fixed": "#001f27",
        "secondary-container": "#50dcff",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#b6c7e9",
        "surface-bright": "#fbf9fb",
        "tertiary-fixed": "#82f9be",
        "tertiary-container": "#002213",
        "surface-container-low": "#f5f3f5",
        "primary": "#00030a",
        "secondary-fixed-dim": "#48d7f9",
        "error-container": "#ffdad6",
        "inverse-surface": "#303032",
        "on-tertiary-container": "#009865",
        "secondary-fixed": "#afecff",
        "on-tertiary-fixed-variant": "#005235",
        "primary-fixed-dim": "#b6c7e9",
        "outline": "#75777e",
        "on-background": "#1b1b1e",
        "on-surface-variant": "#44474d",
        "primary-fixed": "#d6e3ff",
        "on-primary-fixed": "#081c36",
        "surface-container-lowest": "#ffffff",
        "background": "#fbf9fb",
        "on-primary-container": "#7586a5",
        "surface-container-high": "#e9e7ea",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#005f71",
        "surface-dim": "#dbd9dc",
        "surface-container-highest": "#e4e2e4",
        "outline-variant": "#c5c6ce",
        "on-secondary-fixed-variant": "#004e5d",
        "surface-variant": "#e4e2e4",
        "dark": {
            900: '#05070A',
            800: '#0A0E17',
            700: '#111827',
            border: '#ffffff1a',
        },
      },
      borderRadius: {
          "DEFAULT": "0.25rem",
          "lg": "0.5rem",
          "xl": "0.75rem",
          "full": "9999px"
      },
      spacing: {
          "margin-desktop": "40px",
          "gutter": "16px",
          "container-max": "1200px",
          "margin-mobile": "20px",
          "unit": "8px"
      },
      fontFamily: {
          "body-md": ["Plus Jakarta Sans"],
          "label-sm": ["Plus Jakarta Sans"],
          "label-md": ["Plus Jakarta Sans"],
          "headline-sm": ["Plus Jakarta Sans"],
          "headline-md": ["Plus Jakarta Sans"],
          "body-lg": ["Plus Jakarta Sans"],
          "headline-lg": ["Plus Jakarta Sans"],
          "headline-lg-mobile": ["Plus Jakarta Sans"],
          sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
          "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
          "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
          "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }],
          "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
          "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
          "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
          "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
          "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "700" }]
      },
      boxShadow: {
          'neu-extruded': '8px 8px 16px #B8C2D0, -8px -8px 16px #FFFFFF',
          'neu-inset': 'inset 4px 4px 8px #B8C2D0, inset -4px -4px 8px #FFFFFF',
          'neu-inset-deep': 'inset 8px 8px 16px #B8C2D0, inset -8px -8px 16px #FFFFFF',
          'neu-floating': '16px 16px 32px #A3B1C6, -16px -16px 32px #FFFFFF',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      }
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
