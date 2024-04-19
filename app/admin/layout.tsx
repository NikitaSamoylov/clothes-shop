import { AdminMenu } from "@/components/admin/admin-menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "панель администратора",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <div className="container">
        <section style={ {
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        } }>
          <AdminMenu />
          { children }
        </section>
      </div>
    </main>
  );
}
