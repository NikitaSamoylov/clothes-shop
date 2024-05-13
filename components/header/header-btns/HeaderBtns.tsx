'use client';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { AccountMenu } from "../account-popup";
import styles from './HeaderBtns.module.scss';

const HeaderBtns: React.FC = () => {
  const { status } = useSession();

  const cartStore = useAppSelector(state => state.cartList);
  const favoritesStore = useAppSelector(state => state.favoritesList);

  const [menuState, setMenuState] = useState<boolean>(false);

  const closeMenuPop = () => {
    setMenuState(false);
  };

  return (
    <div className={ styles.btn__list }>
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
      <button className={ styles.btn__item }>
        <Link href="/favorites">
          <AiOutlineHeart size={ 20 }
            color="grey"
          />
          {
            status === 'authenticated' && (
              <div className={ styles.btn__icon }>
                <span className={ styles.btn__icon_text }>
                  { favoritesStore.length }
                </span>
              </div>
            )
          }
        </Link>
      </button>
      <button className={ styles.btn__item }>
        <Link href="/cart">
          <BsBagCheck size={ 18 }
            color="grey"
          />
          {
            status === 'authenticated' && (
              <div className={ styles.btn__icon }>
                <span className={ styles.btn__icon_text }>
                  { cartStore.length }
                </span>
              </div>
            )
          }
        </Link>
      </button>
      {
        menuState &&
        <AccountMenu closeMenuPop={ closeMenuPop } />
      }
    </div>
  )
};

export { HeaderBtns };