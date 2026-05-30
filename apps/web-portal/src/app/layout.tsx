import type { Metadata } from "next";
import { Header } from "@/app/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hazem Soussi | Digital Ecosystem",
  description: "Systems, SaaS Tools, Academy & AI Copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
