import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flash Hub",
  description: "Plataforma de automação de marketing da Flash Marketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
