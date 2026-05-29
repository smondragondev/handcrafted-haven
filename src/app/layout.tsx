import type { Metadata } from "next";
import "./globals.css";
import { openSans } from "./ui/fonts";


export const metadata: Metadata = {
  title: "Handcrafted haven app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className}`} >{children}</body>
    </html>
  );
}