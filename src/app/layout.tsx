import type { Metadata } from "next";
import "./globals.css";

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
  return (
    <html lang="en">
      <head>
        {/* Google Fonts preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
