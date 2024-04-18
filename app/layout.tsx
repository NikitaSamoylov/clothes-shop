import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.scss";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trendy Journey",
  description: "Одежда для путешествий",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ nunito.className }>
        <Header />
        <main>
          { children }
        </main>
      </body>
    </html>
  );
}
