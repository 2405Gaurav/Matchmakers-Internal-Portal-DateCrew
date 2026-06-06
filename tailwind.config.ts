import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Core semantic tokens (CSS variable driven) ──────────────
        background: "var(--background)",
        foreground:  "var(--foreground)",
        border:      "var(--border)",
        input:       "var(--input)",
        ring:        "var(--ring)",
        muted: {
          DEFAULT: "var(--muted)",
          fg:      "var(--muted-fg)",
        },
        card: {
          bg:     "var(--card-bg)",
          border: "var(--card-border)",
        },

        // ── Stripe Modern palette ─────────────────────────────────
        sm: {
          primary:      "#533AFD",
          secondary:    "#111827",
          tertiary:     "#B9B9F9",
          neutral:      "#FFFFFF",
          surface:      "#FFFFFF",
          "on-surface": "#0F172A",
          muted:        "#64748B",
          border:       "#E5E7EB",
          accent:       "#81B81A",
          error:        "#EF4444",
        },

        // ── Backward compat: brand tokens ─────────────────────────
        // All existing `bg-brand-500`, `text-brand-500` etc. in
        // dashboard pages now resolve to violet primary.
        brand: {
          400: "#7B5FFF",
          500: "#533AFD",
          600: "#4026E8",
          700: "#3019CC",
        },

        // ── Backward compat: hn tokens (used by all dashboard code)
        // hn-primary  was off-white in dark theme → now violet brand
        // hn-secondary was dark bg  → now white
        hn: {
          primary:   "#533AFD",   // violet brand  (avatar bg, active nav, etc.)
          secondary: "#FFFFFF",   // white          (text on violet bg, etc.)
          neutral:   "#F3F4F6",   // light gray
          tertiary:  "#F1F5F9",   // very light
          error:     "#EF4444",   // red
        },
      },

      // ── Font families ─────────────────────────────────────────────
      fontFamily: {
        sans:    ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        // Backward compat: `font-body` and `font-display` used in old components
        body:    ["'Plus Jakarta Sans'", "-apple-system", "sans-serif"],
      },

      // ── Type scale — Stripe Modern ─────────────────────────────────
      fontSize: {
        "display":      ["48px",  { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "300" }],
        "headline-lg":  ["32px",  { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "300" }],
        "headline-md":  ["20px",  { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "300" }],
        "headline-sm":  ["16px",  { lineHeight: "1.4",                            fontWeight: "300" }],
        "body-lg":      ["18px",  { lineHeight: "1.6",                            fontWeight: "300" }],
        "body-md":      ["14px",  { lineHeight: "1.6",                            fontWeight: "300" }],
        "body-sm":      ["12px",  { lineHeight: "1.5",                            fontWeight: "300" }],
        "label-lg":     ["16px",  { lineHeight: "1.2",                            fontWeight: "400" }],
        "label-md":     ["14px",  { lineHeight: "1.2",                            fontWeight: "400" }],
        "label-sm":     ["12px",  { lineHeight: "1.2",                            fontWeight: "400" }],
        "eyebrow":      ["13px",  { lineHeight: "1.2",  letterSpacing: "0.04em",  fontWeight: "500" }],
      },

      // ── Border radius — both new sm-* and legacy hn-* ─────────────
      borderRadius: {
        // Stripe Modern tokens
        "sm-sm":   "4px",
        "sm-md":   "6px",
        "sm-lg":   "12px",
        "sm-xl":   "20px",
        "sm-full": "9999px",
        // Legacy hn-* tokens (used by sidebar, dashboard, etc.)
        "hn-sm":   "6px",
        "hn-md":   "8px",
        "hn-lg":   "12px",
        "hn-xl":   "16px",
        "hn-pill": "9999px",
      },

      // ── Spacing extras ─────────────────────────────────────────────
      spacing: {
        "sm-xs": "6px",
        "sm-sm": "14px",
        "sm-md": "24px",
        "sm-lg": "40px",
        "sm-xl": "80px",
      },

      // ── Shadows ────────────────────────────────────────────────────
      boxShadow: {
        "sm-card":    "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "sm-card-lg": "0 4px 24px rgba(83,58,253,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        "sm-btn":     "0 4px 16px rgba(83,58,253,0.25)",
        // Legacy tokens used in dashboard
        "hn-soft":    "0 2px 12px rgba(0,0,0,0.08)",
        "glow":       "0 0 8px rgba(83,58,253,0.2)",
        "glow-lg":    "0 0 24px rgba(83,58,253,0.15)",
      },

      // ── Max widths ─────────────────────────────────────────────────
      maxWidth: {
        "stripe": "1200px",
      },

      // ── Keyframes ─────────────────────────────────────────────────
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-down": "slideDown 0.35s ease-out forwards",
        "pulse":      "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
