import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skiu E-commerce",
  description: "Modern e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
