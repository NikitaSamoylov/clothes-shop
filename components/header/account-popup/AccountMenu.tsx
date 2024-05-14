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
      role: string;
      id: string;
    } & DefaultSession["user"];
  }
};

type TMenuPopProps = {
  closeMenuPop: () => void;
};

const userMenuItems = [
  {
    title: 'избранное',
    link: '/favorites',
  },
  {
    title: 'корзина',
    link: '/cart',
  },
  {
    title: 'выйти',
    action: () => signOut(),
  },
];

const AccountMenu: React.FC<TMenuPopProps> = ({ closeMenuPop }) => {
  const { data: session, status } = useSession();

  const renderMenuItems = userMenuItems.map((el) => {
    return (
      <li className={ styles.userMenu__body_item } key={ el.title }>
        <Link href={ el.link ? el.link : '' }
          className={ styles.userMenu__body_link }
          onClick={ el.action ? el.action : closeMenuPop }
        >
          { el.title }
        </Link>
      </li>
    )
  });

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
        {
          status === 'authenticated' &&
            session?.user?.role === 'admin' ?
            (
              <li className={ styles.userMenu__body_item }>
                <Link href="/admin"
                  className={ styles.userMenu__body_link }
                  onClick={ closeMenuPop }
                >
                  админ-панель
                </Link>
              </li>
            ) :
            null
        }
        { renderMenuItems }
      </ul>
    </div>
  )
};

export { AccountMenu };