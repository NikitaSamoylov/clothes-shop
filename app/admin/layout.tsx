import { AdminMenu } from "@/components/admin/admin-menu";
import type { Metadata } from "next";
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: "TJ | Администратор",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <div className="container">
        <section
          className={ styles.adminSection }
        >
          <AdminMenu />
          { children }
        </section>
      </div>
    </main>
  );
}
