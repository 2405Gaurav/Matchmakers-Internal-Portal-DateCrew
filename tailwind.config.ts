import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  // we ar usign class 4 dark mode coz it works good
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
        // im adding strpie moden plalette cz it looks profrasional 
        sm: {
          primary:      "#d97706",
          secondary:    "#16140F",
          tertiary:     "#F5F5EE",
          neutral:      "#E5E7EB",
          surface:      "#F5F5EE",
          "on-surface": "#16140F",
          muted:        "#666666",
          border:       "#E5E7EB",
          accent:       "#15803D",
          error:        "#B42318",
        },

        // ── Backward compat: brand tokens ─────────────────────────
        // All existing `bg-brand-500`, `text-brand-500` etc. in
        // dashboard pages now resolve to amber primary.
        brand: {
          400: "#f59e0b",
          500: "#d97706",
          600: "#b45309",
          700: "#92400e",
        },

        // ── Backward compat: hn tokens (used by all dashboard code)
        // hn-primary  was off-white in dark theme → now amber brand
        // hn-secondary was dark bg  → now white
        hn: {
          primary:   "#d97706",
          secondary: "#F5F5EE",
          neutral:   "#EFE9DE",
          tertiary:  "#FAF8F2",
          error:     "#B42318",
        },
      },

      // ── Font families ─────────────────────────────────────────────
      fontFamily: {
        sans:    ["'Outfit'", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["'Source Serif 4'", "serif"],
        // Backward compat: `font-body` and `font-display` used in old components
        body:    ["'Outfit'", "-apple-system", "sans-serif"],
      },

      // ── Type scale — Stripe Modern ─────────────────────────────────
      fontSize: {
        "display":      ["56px",  { lineHeight: "1.08", letterSpacing: "-0.01em", fontWeight: "300" }],
        "headline-lg":  ["44px",  { lineHeight: "1.1",  letterSpacing: "-0.01em", fontWeight: "300" }],
        "headline-md":  ["32px",  { lineHeight: "1.14", letterSpacing: "0",       fontWeight: "300" }],
        "headline-sm":  ["28px",  { lineHeight: "1.21", letterSpacing: "0",       fontWeight: "400" }],
        "body-lg":      ["18px",  { lineHeight: "1.4",  letterSpacing: "0",       fontWeight: "300" }],
        "body-md":      ["16px",  { lineHeight: "1.5",  letterSpacing: "0",       fontWeight: "300" }],
        "body-sm":      ["14px",  { lineHeight: "1.45", letterSpacing: "0",       fontWeight: "300" }],
        "label-lg":     ["16px",  { lineHeight: "1.4",  letterSpacing: "0",       fontWeight: "400" }],
        "label-md":     ["14px",  { lineHeight: "1.35", letterSpacing: "0",       fontWeight: "400" }],
        "label-sm":     ["12px",  { lineHeight: "1.3",  letterSpacing: "0",       fontWeight: "400" }],
        "eyebrow":      ["13px",  { lineHeight: "1.2",  letterSpacing: "0.04em",  fontWeight: "400" }],
      },

      // ── Border radius — both new sm-* and legacy hn-* ─────────────
      borderRadius: {
        // Stripe Modern tokens
        "sm-sm":   "4px",
        "sm-md":   "8px",
        "sm-lg":   "12px",
        "sm-xl":   "24px",
        "sm-full": "9999px",
        // Legacy hn-* tokens (used by sidebar, dashboard, etc.)
        "hn-sm":   "4px",
        "hn-md":   "8px",
        "hn-lg":   "12px",
        "hn-xl":   "24px",
        "hn-pill": "9999px",
      },

      // ── Spacing extras ─────────────────────────────────────────────
      spacing: {
        "sm-xs": "6px",
        "sm-sm": "16px",
        "sm-md": "30px",
        "sm-lg": "48px",
        "sm-xl": "64px",
      },

      // ── Shadows ────────────────────────────────────────────────────
      // shaddow for makin the thins pop out more
      boxShadow: {
        "sm-card":    "0 0 0 1px rgba(22,20,15,0.04)",
        "sm-card-lg": "0 8px 30px rgba(22,20,15,0.06)",
        "sm-btn":     "0 8px 24px rgba(180,83,9,0.12)",
        // Legacy tokens used in dashboard
        "hn-soft":    "0 8px 24px rgba(22,20,15,0.05)",
        "glow":       "0 0 0 1px rgba(217,119,6,0.16)",
        "glow-lg":    "0 10px 30px rgba(217,119,6,0.12)",
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
