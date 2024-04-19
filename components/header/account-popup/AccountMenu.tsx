'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { DefaultSession } from "next-auth";
import styles from './AccountMenu.module.scss';

declare module "next-auth" {
  interface Session {
    user?: {
      username: string;
    } & DefaultSession["user"];
  }
}

const AccountMenu: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className={ styles.userMenu }>
      <div className={ styles.userMenu__header }>
        <span className={ styles.userMenu__hello_item }>
          Привет,
        </span>
        <span className={ styles.userMenu__hello_name }>
          { session?.user?.username }
        </span>
      </div>
      <ul className={ styles.userMenu__body }>
        <li className={ styles.userMenu__body_item }>
          <Link href=""
            className={ styles.userMenu__body_link }
          >
            аккаунт
          </Link>
        </li>
        <li className={ styles.userMenu__body_item }>
          <Link href=""
            className={ styles.userMenu__body_link }
          >
            избранное
          </Link>
        </li>
        <li className={ styles.userMenu__body_item }>
          <Link href=""
            className={ styles.userMenu__body_link }
          >
            корзина
          </Link>
        </li>
        <li className={ styles.userMenu__body_item }
          onClick={ () => signOut() }
        >
          <Link href=""
            className={ styles.userMenu__body_link }
          >
            выйти
          </Link>
        </li>
      </ul>
    </div>
  )
};

export { AccountMenu };