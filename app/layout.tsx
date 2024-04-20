import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Header } from "@/components/header";
import "./globals.scss";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trendy Journey",
  description: "Одежда для путешествий",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<{
  children: React.ReactNode;
}>) {
  const session = getServerSession();

  return (
    <html lang="ru">
      <body className={ nunito.className }>
        <AntdRegistry>
          <SessionProvider session={ session }>
            <Header />
            <main>
              { children }
            </main>
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
