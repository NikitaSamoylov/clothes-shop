'use client';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { AccountMenu } from "../account-popup";
import styles from './HeaderBtns.module.scss';

const HeaderBtns: React.FC = () => {
  const { data: session, status } = useSession();

  const [menuState, setMenuState] = useState<boolean>(false);

  return (
    <div className={ styles.btn__list }>
      <button className={ styles.btn__item }>
        <AiOutlineHeart size={ 20 }
          color="grey"
        />
      </button>
      {
        status !== 'authenticated' ?
          (
            <button className={ styles.btn__item }>
              <Link href='/login'>
                <FiUser size={ 20 }
                  color="grey"
                />
              </Link>
            </button>
          ) :
          (
            <button className={ styles.btn__item }
              onClick={ () => setMenuState(menuState => !menuState) }
            >
              <FiUserCheck size={ 20 }
                color="#308DA1"
              />
            </button>
          )
      }
      <button className={ styles.btn__item }
        onClick={ () => signOut() }
      >
        <BsBagCheck size={ 18 }
          color="grey"
        />
      </button>
      {
        menuState &&
        <AccountMenu />
      }
    </div>
  )
};

export { HeaderBtns };