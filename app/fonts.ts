import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

export const generalSans = localFont({
  src: "../public/fonts/GeneralSans-Variable.woff2",
  weight: "200 700",
  display: "swap",
  variable: "--font-general-sans",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});
