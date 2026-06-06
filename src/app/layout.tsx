import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";


export const metadata: Metadata = {
  title: "TDC Matchmakers — Internal CRM",
  description: "Premium AI-assisted matrimonial CRM for The Date Crew matchmaking team.",
  keywords: ["matchmaking", "CRM", "matrimonial", "TDC", "The Date Crew"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (function () {
      try {
        var savedTheme = localStorage.getItem("tdc-crm-theme");
        var resolvedTheme = savedTheme === "dark" || savedTheme === "light"
          ? savedTheme
          : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        var root = document.documentElement;
        root.classList.toggle("dark", resolvedTheme === "dark");
        root.style.colorScheme = resolvedTheme;
      } catch (error) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
