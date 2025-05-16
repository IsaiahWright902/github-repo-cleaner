import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Git Repo Cleaner",
  description: "Clean your old repos up that are just sitting there before they start charging",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
