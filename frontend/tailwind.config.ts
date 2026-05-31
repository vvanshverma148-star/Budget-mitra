import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keeping legacy background colors for compatibility but adding the new dark theme ones
        background: "#05070A",
        surface: "#0A0E17",
        surfaceAlt: "#111827",
        border: "rgba(255, 255, 255, 0.08)",
        borderHover: "rgba(255, 255, 255, 0.15)",
        textPrimary: "#FFFFFF",
        textSecondary: "#94A3B8", // slate-400 equivalent
        textMuted: "#64748B", // slate-500 equivalent
        
        // Legacy Brand colors (kept for any straggler components)
        brandPrimary: "#6D28D9",
        brandLight: "#8B5CF6",
        brandDark: "#4C1D95",
        
        // New Superdesign Colors
        dark: {
            900: '#05070A',
            800: '#0A0E17',
            700: '#111827',
            border: '#ffffff1a',
        },
        accent: {
            teal: '#00F0FF',
            blue: '#0057FF',
            purple: '#BD00FF',
        },
        
        // Status Colors
        success: "#10B981",
        successLight: "#34D399",
        warning: "#F59E0B",
        warningLight: "#FBBF24",
        danger: "#EF4444",
        dangerLight: "#F87171",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 8px 32px 0 rgba(139, 92, 246, 0.2)',
        'glow': '0 0 20px 0 var(--tw-shadow-color)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-letter': 'bounceLetter 0.8s cubic-bezier(0.68, -0.55, 0.26, 1.55) forwards',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'draw-line': 'drawLine 2s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
            '0%, 100%': { opacity: '1', transform: 'scale(1)' },
            '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        bounceLetter: {
            '0%': { opacity: '0', transform: 'translateY(40px) scale(0.8) rotateX(-40deg)' },
            '50%': { opacity: '1', transform: 'translateY(-10px) scale(1.1) rotateX(0)' },
            '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotateX(0)' },
        },
        twinkle: {
            '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
            '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drawLine: {
            '0%': { strokeDashoffset: '2000' },
            '100%': { strokeDashoffset: '0' },
        },
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
