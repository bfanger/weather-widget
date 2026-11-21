import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const dseg14 = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/dseg14-classic/files/dseg14-classic-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/dseg14-classic/files/dseg14-classic-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dseg14",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather forecast",
  description: "Assignment by Bob Fanger for Sopra Steria",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dseg14.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-950 font-sans text-slate-200">
        {children}
      </body>
    </html>
  );
}
