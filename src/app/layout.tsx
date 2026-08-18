import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Providers from "@/providers/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  title: "Kabir | AI Engineer",
  description: "Building Intelligence into Software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`} suppressHydrationWarning>
        <Navbar />
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}